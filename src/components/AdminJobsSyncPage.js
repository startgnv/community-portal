import _ from 'lodash';
import React, { useState } from 'react';
import { db } from '../firebase';
import { useAdminContainer } from './AdminPageContainer';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import FormCardPage from './FormCardPage';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import StorageAvatar from './StorageAvatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

const getLeverJobsURL = leverID =>
  `https://api.lever.co/v0/postings/${leverID}?mode=json`;
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

const AdminJobsSyncPage = () => {
  const [companies = [], loading, error] = useCollectionData(
    db.collection('companies'),
    { idField: 'id' }
  );
  useAdminContainer({ loading });

  const [fetchingJobs, setFetchingJobs] = useState(false);
  const [pendingJobs, setPendingJobs] = useState([]);
  const leverCompanies = companies.filter(company => company.leverID);

  const onSyncJobsClick = () => {
    setFetchingJobs(true);
    const leverPromises = [];
    const jobsToCreate = [];
    leverCompanies.forEach(company => {
      leverPromises.push(
        fetch(getLeverJobsURL(company.leverID)).then(res =>
          res.json().then(json => {
            const leverJobs = {
              ...leverJobs,
              [company.id]: json
            };
            return leverJobs;
          })
        )
      );
    });
    const leverAll = Promise.all(leverPromises).then(vals => {
      let leverCompanyJobs = {};
      vals.forEach(val => {
        leverCompanyJobs = {
          ...leverCompanyJobs,
          ...val
        };
      });
      _.each(leverCompanyJobs, (companyJobs, i) => {
        companyJobs.forEach(job => {
          jobsToCreate.push(leverToPortal(i, job));
        });
      });
      setPendingJobs([...pendingJobs, ...jobsToCreate]);
    });
    Promise.all([leverAll]).then(() => setFetchingJobs(false));
  };

  return (
    <FormCardPage title="Sync Jobs">
      {pendingJobs && !!pendingJobs.length && (
        <>
          <Typography variant="h6">Jobs to create</Typography>
          <List>
            {pendingJobs.map(job => {
              console.warn(job);
              const company = companies.find(
                company => company.id === job.companyID
              );
              return (
                <ListItem key={job.id}>
                  <Checkbox />
                  <ListItemAvatar>
                    <StorageAvatar
                      path={company.logoPath}
                      avatarProps={{ style: { width: '40px' } }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={job.title} secondary={company.name} />
                </ListItem>
              );
            })}
          </List>
        </>
      )}
      <Button
        onClick={onSyncJobsClick}
        disabled={fetchingJobs}
        variant="contained"
        color="primary"
        type="submit"
      >
        {fetchingJobs ? 'Getting Jobs...' : 'Sync Jobs'}
      </Button>
    </FormCardPage>
  );
};

export default AdminJobsSyncPage;
