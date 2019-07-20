import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { useAdminContainer } from './AdminPageContainer';
import AdminListCard from './AdminListCard';
import { db } from '../firebase';

const useStyles = makeStyles({
  fab: {
    position: 'absolute',
    bottom: '100px',
    right: '20px'
  },
  container: {
    marginTop: '20px'
  },
  progress: {
    display: 'block',
    margin: 'auto'
  }
});

export const AdminCompaniesPage = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [companies = [], loading, error] = useCollectionData(
    db.collection('companies'),
    { idField: 'id' }
  );

  useAdminContainer({ loading });

  return (
    <>
      <Container className={classes.container} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="search"
              fullWidth
              margin="normal"
              label="Search Companies"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </Grid>
          {companies
            .filter(({ name = '' }) => name.includes(search))
            .map(({ name, id, coverImg, logoImg }) => (
              <Grid key={id} item md={4} xs={12}>
                <AdminListCard
                  key={id}
                  coverSrc={coverImg}
                  logoSrc={logoImg}
                  label={name}
                  linkTo={`/admin/companies/${id}/edit`}
                />
              </Grid>
            ))}
        </Grid>
        {error && (
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
        to="/admin/companies/new"
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default AdminCompaniesPage;
