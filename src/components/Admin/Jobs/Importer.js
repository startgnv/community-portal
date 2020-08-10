import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { useAdminContainer } from '../UI/PageContainer';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import stringSimilarity from 'string-similarity';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import StorageAvatar from './StorageAvatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

// Convert the Lever job type into our own job type
const getLeverJobType = leverJob => {
  let type = '';
  if (leverJob && leverJob.categories && leverJob.categories.commitment) {
    switch (leverJob.categories.commitment) {
      case 'Full-Time':
        type = 'fullTime';
        break;
      case 'Part-Time':
        type = 'partTime';
        break;
    }
  }
  return type;
};

// Lever breaks up their content into a few different fields
// Combine them so it plays nice with our wysiwyg
const getLeverDescription = ({ description, lists }) => {
  let listHTML = '';
  lists.forEach(
    list => (listHTML += `<h3>${list.text}</h3><ul>${list.content}</ul>`)
  );
  return description + listHTML;
};

// Convert Lever jobs to portal jobs
// Store the original Lever data
const leverToPortal = (companyID, leverJob) => {
  const portalJob = {
    companyID,
    title: leverJob.text,
    description: getLeverDescription(leverJob),
    applyUrl: leverJob.applyUrl,
    featured: false,
    type: getLeverJobType(leverJob),
    leverData: leverJob,
    remoteID: leverJob.id,
    categories: []
  };
  return portalJob;
};

const getRemoteJobsInfo = company => {
  let url;
  let format;
  const manualUrl = company.manualImportUrl;
  const type = company.ats || '';

  if (company.leverID) {
    url = `https://api.lever.co/v0/postings/${company.leverID}?mode=json`;
    format = 'json';
  } else if (company.greenhouseID) {
    url = `https://boards-api.greenhouse.io/v1/boards/${
      company.greenhouseID
    }/jobs`;
    format = 'json';
  } else if (company.ultiproID) {
    // Unfortunately, UltiPro has no public API for this yet
    // The below request requires CORS, which they don't have enabled
    url = `https://recruiting.ultipro.com/${
      company.ultiproID
    }/JobBoard/a1f626ce-9a88-4c30-86ee-6562ee8ea030/JobBoardView/LoadSearchResults`;
    format = 'json';
  }

  return {
    url,
    type,
    format,
    manualUrl
  };
};

// Match jobs we already have listed to jobs we got from the ATS
const matchJobs = (remoteJobs, portalJobs) => {
  return remoteJobs
    .map(remoteJob => {
      let matchingPortalJobs = [];
      let matchType = 'none';
      // Check if there is an exact job match
      const exactMatch = portalJobs.find(
        portalJob =>
          portalJob.leverData && portalJob.leverData.id === remoteJob.remoteID
      );
      if (exactMatch) {
        matchingPortalJobs = [exactMatch];
      }
      if (matchingPortalJobs.length) {
        matchType = 'exact';
      } else {
        // If there is no exact job match look for a close match based on the job title
        matchingPortalJobs = portalJobs.filter(
          portalJob =>
            stringSimilarity.compareTwoStrings(
              remoteJob.title,
              portalJob.title
            ) > 1
        );
        if (!matchingPortalJobs.length) {
          matchingPortalJobs = portalJobs.filter(
            portalJob =>
              stringSimilarity.compareTwoStrings(
                remoteJob.title,
                portalJob.title
              ) > 0.75
          );
        }
        if (matchingPortalJobs.length) {
          matchType = 'title';
        }
      }
      return {
        remote: remoteJob,
        portal: matchingPortalJobs[0],
        matchType
      };
    })
    .filter(match => match.portal && match.remote);
};

const AdminJobsSyncPage = () => {
  const [companies = [], companiesLoading, companiesError] = useCollectionData(
    db.collection('companies'),
    { idField: 'id' }
  );
  const [jobs = [], jobsLoading, jobsError] = useCollectionData(
    db.collection(
      process.env.REACT_APP_ENVIRONMENT === 'test' ? 'jobsTest' : 'jobs'
    ),
    { idField: 'id' }
  );
  const [
    jobCategories = [],
    jobCategoriesLoading,
    jobCategoriesError
  ] = useCollectionData(db.collection('jobCategories'), { idField: 'id' });
  useAdminContainer({
    loading: companiesLoading || jobsLoading
  });

  const [view, setView] = useState({ value: 'new', label: 'New Jobs' });
  const [fetchingJobs, setFetchingJobs] = useState(false);
  const [importingJobs, setImportingJobs] = useState(false);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [matchingJobs, setMatchingJobs] = useState([]);
  const [importCompany, setImportCompany] = useState('');
  const importableCompanies = companies.filter(
    company =>
      company.leverID ||
      company.greenhouseID ||
      company.ultiproID ||
      company.manualImportUrl
  );
  const [selectedJobs, setSelectedJobs] = useState({});

  const processLeverResponse = (companyID, res) => {
    return res.json().then(remoteJobs => {
      const formattedJobs = remoteJobs.map(job =>
        leverToPortal(companyID, job)
      );
      const matchedJobs = matchJobs(formattedJobs, jobs);
      setMatchingJobs([...matchingJobs, ...matchedJobs]);
      return formattedJobs;
    });
  };

  const processUltiproResponse = (companyID, res) => {
    return res.json().then(remoteJobs => {
      /*const formattedJobs = remoteJobs.map(job =>
        leverToPortal(companyID, job)
      );
      const matchedJobs = matchJobs(formattedJobs, jobs);
      return {
        jobs: matchedJobs,
        companyID
      };*/
      return {};
    });
  };

  const onGetJobsClick = () => {
    setFetchingJobs(true);
    const remoteJobPromises = [];
    const jobsToCreate = [];
    let importCompanies = importableCompanies;
    if (importCompany) {
      importCompanies = [
        companies.find(company => company.id === importCompany)
      ];
    }

    importCompanies.forEach(company => {
      const remoteInfo = getRemoteJobsInfo(company);
      if (remoteInfo.url) {
        remoteJobPromises.push(
          fetch(remoteInfo.url, { mode: 'cors' })
            .then(res => {
              switch (remoteInfo.type) {
                case 'lever':
                  processLeverResponse(company.id, res).then(formattedJobs => {
                    setPendingJobs([...pendingJobs, ...formattedJobs]);
                  });
                  break;
              }
            })
            .catch(err => {
              console.warn(err);
            })
        );
      }
    });

    Promise.all(remoteJobPromises).then(() => setFetchingJobs(false));
  };

  const companyOptions = importableCompanies.map(({ id, name }) => ({
    value: id,
    label: name
  }));

  const jobActionOptions = [
    {
      value: 'skip',
      label: 'Skip'
    },
    {
      value: 'import',
      label: 'Import'
    },
    {
      value: 'replace',
      label: 'Replace'
    }
  ];

  const viewOptions = [
    {
      value: 'new',
      label: 'New Jobs'
    },
    {
      value: 'matches',
      label: 'Matching Jobs'
    },
    {
      value: 'old',
      label: 'Old Jobs'
    }
  ];

  const onJobActionChange = (value, remoteID) => {
    setSelectedJobs({
      ...selectedJobs,
      [remoteID]: value
    });
  };

  const onImportClick = () => {
    setImportingJobs(true);
    const importPromises = [];
    pendingJobs.forEach(job => {
      const selectedJob = selectedJobs[job.remoteID];
      if (selectedJob) {
        switch (selectedJob.value) {
          case 'replace':
            break;
          case 'import':
            importPromises.push(
              db
                .collection(
                  process.env.REACT_APP_ENVIRONMENT === 'test'
                    ? 'jobsTest'
                    : 'jobs'
                )
                .add({
                  ...job,
                  TSCreated: Date.now(),
                  imported: true
                })
            );
            break;
        }
      }
    });
    Promise.all(importPromises).then(res => {
      setImportingJobs(false);
    });
  };

  const summary = {
    delete: 0,
    replace: 0,
    import: 0
  };
  _.each(selectedJobs, (val, key) => {
    if (val.value === 'delete') {
      summary.delete += 1;
    } else if (val.value === 'replace') {
      summary.replace += 1;
    } else if (val.value === 'import') {
      summary.import += 1;
    }
  });

  let renderJobs = [];
  let viewDescription = '';
  if (view.value === 'new') {
    if (matchingJobs.length) {
      renderJobs = pendingJobs.filter(
        pendingJob =>
          !matchingJobs.find(
            matchingJob => pendingJob.remoteID === matchingJob.remote.remoteID
          )
      );
    } else {
      renderJobs = pendingJobs;
    }
    viewDescription =
      'Jobs listed below are listed in the ATS and do not exist in the portal.';
  } else if (view.value === 'matches') {
    renderJobs = matchingJobs.map(match => match.portal);
    viewDescription =
      'Jobs listed below exist in the portal and match up with a job listed in the ATS.';
  } else {
    const filteredJobs = jobs.filter(job => importCompany === job.companyID);
    if (matchingJobs.length) {
      renderJobs = filteredJobs.filter(
        portalJob =>
          !matchingJobs.find(
            matchingJob => portalJob.id === matchingJob.portal.id
          )
      );
    } else {
      renderJobs = filteredJobs;
    }
    viewDescription =
      'Jobs listed below exist in the portal but do not match any jobs listed in the ATS.';
  }

  const onViewChange = selected => {
    setView(selected);
    setSelectedJobs([]);
  };

  return (
    <Container>
      <Typography variant="h3">Import Jobs</Typography>
      {pendingJobs && !!pendingJobs.length ? (
        <>
          <Select options={viewOptions} onChange={onViewChange} value={view} />
          <p>{viewDescription}</p>
          <List>
            {renderJobs && renderJobs.length > 0 ? (
              renderJobs.map(job => {
                const company = companies.find(
                  company => company.id === job.companyID
                );
                return (
                  <ListItem
                    key={job.remoteID}
                    selected={
                      selectedJobs[job.remoteID] &&
                      selectedJobs[job.remoteID].value !== 'skip'
                    }
                  >
                    <div style={{ display: 'flex', flex: 3 }}>
                      <ListItemAvatar>
                        <StorageAvatar
                          path={company.logoPath}
                          avatarProps={{ style: { width: '40px' } }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={job.title}
                        secondary={company.name}
                      />
                    </div>
                    <div style={{ flex: 1 }} className="actions">
                      <Select
                        options={jobActionOptions}
                        onChange={selected =>
                          onJobActionChange(selected, job.remoteID)
                        }
                        value={
                          selectedJobs[job.remoteID] || {
                            value: 'skip',
                            label: 'Skip'
                          }
                        }
                      />
                    </div>
                    {job.id && (
                      <>
                        <Button
                          variant="outlined"
                          href={'/jobs/' + job.id}
                          target="_blank"
                        >
                          View Job
                        </Button>
                        <Button
                          variant="outlined"
                          href={'/admin/jobs/' + job.id}
                          target="_blank"
                        >
                          Edit Job
                        </Button>
                      </>
                    )}
                  </ListItem>
                );
              })
            ) : (
              <p>There are no jobs that match the above criteria.</p>
            )}
          </List>
        </>
      ) : (
        <Grid item>
          <FormLabel>Company</FormLabel>
          <Select
            options={companyOptions}
            value={companyOptions.find(({ value }) => value === importCompany)}
            onChange={({ value }) => {
              setImportCompany(value);
            }}
          />
        </Grid>
      )}
      {Object.keys(selectedJobs).length > 0 && (
        <Grid item>
          <Typography variant="h4">Summary</Typography>
          <Typography variant="body1">
            Import {summary.import} job(s)
          </Typography>
          <Typography variant="body1">
            Replace {summary.replace} job(s)
          </Typography>
        </Grid>
      )}
      <Grid item>
        {Object.keys(selectedJobs).length > 0 && (
          <Button
            onClick={onImportClick}
            disabled={importingJobs}
            variant="contained"
            color="primary"
            type="submit"
          >
            {importingJobs ? 'Importing Jobs...' : 'Import'}
          </Button>
        )}
        {pendingJobs.length === 0 && (
          <Button
            onClick={onGetJobsClick}
            disabled={fetchingJobs}
            variant="contained"
            color="primary"
            type="submit"
          >
            {fetchingJobs ? 'Getting Jobs...' : 'Get Jobs'}
          </Button>
        )}
      </Grid>
    </Container>
  );
};

export default AdminJobsSyncPage;
