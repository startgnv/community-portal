import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { firestore } from 'firebase/app';
import { NewCompanyForm } from './NewCompanyForm';
import { NewJobForm } from './NewJobForm';
import { useCollection } from 'react-firebase-hooks/firestore';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    width: 400,
    backgroundColor: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none'
  }
}));

export const AdminIndex = () => {
  const classes = useStyles();
  const [companies, companiesLoading, companiesError] = useCollection(
    db.collection('companies')
  );
  const [jobs, jobsLoading, jobsError] = useCollection(db.collection('jobs'));
  const [showNewCompanyModal, setShowNewCompanyModal] = useState(false);
  const [showNewJobModal, setShowNewJobModal] = useState(false);

  let companiesList;
  if (companiesLoading) {
    companiesList = <LinearProgress />;
  } else if (companiesError) {
    companiesList = (
      <LinearProgress value="75" variant="determinate" color="secondary" />
    );
  } else {
    companiesList = (
      <List>
        {companies.docs.map(doc => {
          const { name } = doc.data();
          return (
            <ListItem key={doc.id} divider button>
              <ListItemText>
                {name}
                <Link to={`/admin/companies/${doc.id}/edit`}>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Link>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    );
  }
  let jobsList;
  if (jobsLoading || companiesLoading) {
    jobsList = <span>Loading Jobs...</span>;
  } else if (jobsError) {
    jobsList = <span>ERROR Loading Jobs</span>;
  } else {
    jobsList = (
      <List>
        {jobs.docs.map(doc => {
          const { title } = doc.data();
          return (
            <ListItem key={doc.id} divider button>
              <ListItemText>
                {title}
                <Link to={`/admin/jobs/${doc.id}/edit`}>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Link>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    );
  }
  const onNewCompanySubmit = ({ name, latitude, longitude }) => {
    db.collection('companies').add({
      name,
      coordinates: new firestore.GeoPoint(latitude, longitude)
    });
  };
  const onNewJobSubmit = ({ title, description, companyID, applyUrl }) => {
    db.collection('jobs').add({
      title,
      description,
      companyID,
      applyUrl
    });
  };
  return (
    <div>
      <Modal
        className={classes.modal}
        open={showNewCompanyModal}
        onClose={() => setShowNewCompanyModal(false)}
      >
        <Paper className={classes.paper}>
          <h3>Create Company</h3>
          <NewCompanyForm onSubmit={onNewCompanySubmit} />
        </Paper>
      </Modal>
      <Modal
        className={classes.modal}
        open={showNewJobModal}
        onClose={() => setShowNewJobModal(false)}
      >
        <Paper className={classes.paper}>
          <h3>Create Job</h3>
          {companies && companies.docs && (
            <NewJobForm onSubmit={onNewJobSubmit} companies={companies.docs} />
          )}
        </Paper>
      </Modal>
      <Grid container>
        <Grid item>
          <h3>Companies</h3>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowNewCompanyModal(true)}
          >
            <AddIcon />
            Add Company
          </Button>
          {companiesList}
        </Grid>
        <Grid item>
          <h3>Jobs</h3>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowNewJobModal(true)}
          >
            <AddIcon />
            Add Job
          </Button>
          {jobsList}
        </Grid>
      </Grid>
    </div>
  );
};
