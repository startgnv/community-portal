import _ from 'lodash';
import React, { useState } from 'react';
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
const leverToPortal = (companyID, leverJob) => {
  const portalJob = {
    companyID,
    title: leverJob.text,
    description: '<p>' + leverJob.descriptionPlain + '</p>',
    applyUrl: leverJob.applyUrl,
    featured: false,
    type: getLeverJobType(leverJob),
    leverData: leverJob
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
  }

  return {
    url,
    type,
    format
  };
};

const matchJobs = (remoteJobs, portalJobs) => {
  return remoteJobs.map(remoteJob => {
    const matchingPortalJobs = portalJobs.filter(
      portalJob =>
        // TODO: Check for a stored ID of the remote job and match on that as well
        stringSimilarity.compareTwoStrings(remoteJob.title, portalJob.title) >
        0.75
    );
    return {
      remoteJob,
      matches: matchingPortalJobs
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
  useAdminContainer({
    loading: companiesLoading || jobsLoading
  });

  const [fetchingJobs, setFetchingJobs] = useState(false);
  const [pendingJobsByCompany, setPendingJobsByCompany] = useState([]);
  const [importCompany, setImportCompany] = useState('');
  const importableCompanies = companies.filter(
    company => company.leverID || company.greenhouseID
  );

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
          fetch(remoteInfo.url).then(res => {
            switch (remoteInfo.type) {
              case 'lever':
                processLeverResponse(company.id, res).then(formattedJobs => {
                  console.warn(formattedJobs);
                  setPendingJobsByCompany([
                    ...pendingJobsByCompany,
                    formattedJobs
                  ]);
                });
                break;
            }
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
      value: 'delete',
      label: 'Delete'
    },
    {
      value: 'replace',
      label: 'Replace'
    }
  ];

  return (
    <Container>
      <h2>Import Jobs</h2>
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
                  {companyJobs.jobs.map(jobWithMatches => (
                    <ListItem key={jobWithMatches.remoteJob.id}>
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
                      <div style={{ flex: 1 }}>
                        <Select
                          options={jobActionOptions}
                          onChange={({ value }) => {}}
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
                                      avatarProps={{ style: { width: '40px' } }}
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
                  ))}
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
      <Button
        onClick={onGetJobsClick}
        disabled={fetchingJobs}
        variant="contained"
        color="primary"
        type="submit"
      >
        {fetchingJobs ? 'Getting Jobs...' : 'Get Jobs'}
      </Button>
    </Container>
  );
};

export default AdminJobsSyncPage;
