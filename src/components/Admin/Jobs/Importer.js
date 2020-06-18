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
const getLeverDescription = ({ description, lists }) => {
  let listHTML = '';
  lists.forEach(
    list => (listHTML += `<h3>${list.text}</h3><ul>${list.content}</ul>`)
  );
  return description + listHTML;
};
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
  let type;
  let format;

  if (company.leverID) {
    url = `https://api.lever.co/v0/postings/${company.leverID}?mode=json`;
    type = 'lever';
    format = 'json';
  } else if (company.greenhouseID) {
    url = `https://boards-api.greenhouse.io/v1/boards/${
      company.greenhouseID
    }/jobs`;
    type = 'greenhouse';
    format = 'json';
  } else if (company.ultiproID) {
    url = `https://recruiting.ultipro.com/${
      company.ultiproID
    }/JobBoard/a1f626ce-9a88-4c30-86ee-6562ee8ea030/JobBoardView/LoadSearchResults`;
    type = 'ultipro';
    format = 'json';
  }

  return {
    url,
    type,
    format
  };
};

const matchJobs = (remoteJobs, portalJobs) => {
  return remoteJobs.map(remoteJob => {
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
          stringSimilarity.compareTwoStrings(remoteJob.title, portalJob.title) >
          0.75
      );
      if (matchingPortalJobs.length) {
        matchType = 'title';
      }
    }
    return {
      remoteJob,
      matches: matchingPortalJobs,
      matchType
    };
  });
};

const AdminJobsSyncPage = () => {
  const [companies = [], companiesLoading, companiesError] = useCollectionData(
    db.collection('companies'),
    { idField: 'id' }
  );
  const [jobs = [], jobsLoading, jobsError] = useCollectionData(
    db.collection('jobs'),
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

  const [fetchingJobs, setFetchingJobs] = useState(false);
  const [importingJobs, setImportingJobs] = useState(false);
  const [pendingJobsByCompany, setPendingJobsByCompany] = useState([]);
  const [importCompany, setImportCompany] = useState('');
  const importableCompanies = companies.filter(
    company => company.leverID || company.greenhouseID || company.ultiproID
  );
  const [selectedJobs, setSelectedJobs] = useState({});

  const processLeverResponse = (companyID, res) => {
    return res.json().then(remoteJobs => {
      const formattedJobs = remoteJobs.map(job =>
        leverToPortal(companyID, job)
      );
      const matchedJobs = matchJobs(formattedJobs, jobs);
      return {
        jobs: matchedJobs,
        companyID
      };
    });
  };

  const processUltiproResponse = (companyID, res) => {
    console.warn(companyID, res);
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
                    setPendingJobsByCompany([
                      ...pendingJobsByCompany,
                      formattedJobs
                    ]);
                  });
                  break;
                case 'ultipro':
                  processUltiproResponse(company.id, res).then(
                    formattedJobs => {
                      setPendingJobsByCompany([
                        ...pendingJobsByCompany,
                        formattedJobs
                      ]);
                    }
                  );
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
  companyOptions.unshift({
    value: '',
    label: 'All Companies'
  });

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

  const onJobActionChange = (value, remoteID) => {
    setSelectedJobs({
      ...selectedJobs,
      [remoteID]: value
    });
  };

  const onImportClick = () => {
    setImportingJobs(true);
    const importPromises = [];
    pendingJobsByCompany.forEach(companyJobs => {
      companyJobs.jobs.forEach(job => {
        const selectedJob = selectedJobs[job.remoteJob.remoteID];
        if (selectedJob) {
          switch (selectedJob.value) {
            case 'replace':
              break;
            case 'import':
              importPromises.push(
                db.collection('jobs').add({
                  ...job.remoteJob,
                  TSCreated: Date.now(),
                  imported: true
                })
              );
              break;
          }
        }
      });
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

  return (
    <Container>
      <Typography variant="h3">Import Jobs</Typography>
      {pendingJobsByCompany && !!pendingJobsByCompany.length ? (
        <>
          {pendingJobsByCompany.map(companyJobs => {
            const company = companies.find(
              company => company.id === companyJobs.companyID
            );
            return (
              <>
                <Typography variant="h5">{company.name}</Typography>
                <List>
                  {companyJobs.jobs.map(jobWithMatches => {
                    return (
                      <ListItem
                        key={jobWithMatches.remoteJob.remoteID}
                        selected={
                          selectedJobs[jobWithMatches.remoteJob.remoteID] &&
                          selectedJobs[jobWithMatches.remoteJob.remoteID]
                            .value !== 'skip'
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
                            primary={jobWithMatches.remoteJob.title}
                            secondary={company.name}
                          />
                        </div>
                        <div style={{ flex: 1 }} className="actions">
                          <Select
                            options={jobActionOptions}
                            onChange={selected =>
                              onJobActionChange(
                                selected,
                                jobWithMatches.remoteJob.remoteID
                              )
                            }
                            value={
                              selectedJobs[
                                jobWithMatches.remoteJob.remoteID
                              ] || {
                                value: 'skip',
                                label: 'Skip'
                              }
                            }
                          />
                        </div>
                        <div style={{ display: 'flex', flex: 3 }}>
                          {jobWithMatches.matches &&
                            jobWithMatches.matches.length > 0 && (
                              <List>
                                {jobWithMatches.matches.map(jobMatch => (
                                  <ListItem key={jobMatch.id}>
                                    <ListItemAvatar>
                                      <StorageAvatar
                                        path={company.logoPath}
                                        avatarProps={{
                                          style: { width: '40px' }
                                        }}
                                      />
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={jobMatch.title}
                                      secondary={company.name}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            )}
                        </div>
                      </ListItem>
                    );
                  })}
                </List>
              </>
            );
          })}
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
        {pendingJobsByCompany.length === 0 && (
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
