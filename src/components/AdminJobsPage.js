import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

import { db } from '../firebase';
import { useAdminContainer } from './AdminPageContainer';
import AdminListCard from './AdminListCard';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  container: {
    marginTop: '20px'
  },
  progress: {
    display: 'block',
    margin: 'auto'
  }
}));

export const AdminJobsPage = ({ match: { isExact } }) => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [jobs = [], loadingJobs, errorJobs] = useCollectionData(
    db.collection('jobs'),
    {
      idField: 'id'
    }
  );
  const [companies = [], loadingCompanies, errorCompanies] = useCollectionData(
    db.collection('companies'),
    {
      idField: 'id'
    }
  );

  useAdminContainer({ loading: loadingJobs || loadingCompanies });

  const companiesByID = companies.reduce(
    (memo, company) => ({
      [company.id]: company,
      ...memo
    }),
    {}
  );

  return (
    <>
      <Container className={classes.container} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="search"
              fullWidth
              margin="normal"
              label="Search Jobs"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </Grid>
          {jobs
            .filter(({ title }) => title.includes(search))
            .map(job => (
              <Grid item md={4} xs={12}>
                <AdminListCard
                  company={companiesByID[job.companyID]}
                  label={job.title}
                  linkTo={`/admin/jobs/${job.id}`}
                  key={job.id}
                />
              </Grid>
            ))}
        </Grid>
        {(errorJobs || errorCompanies) && (
          <CircularProgress
            value="75"
            variant="determinate"
            color="secondary"
          />
        )}
      </Container>

      <Fab
        className={classes.fab}
        color="primary"
        component={Link}
        to="/admin/jobs/new"
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default AdminJobsPage;
