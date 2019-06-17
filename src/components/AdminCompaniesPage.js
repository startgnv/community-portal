import React from 'react';
import { Link } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import { CardActionArea, Hidden } from '@material-ui/core';

import AdminPageContainer from './AdminPageContainer';
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
  },
  listItemMap: {
    backgroundColor: 'black',
    height: '200px'
  },
  listItemContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexGrow: 1
  },
  listItemActionArea: {
    flexGrow: 1
  }
});

const AdminCompanyListItem = ({ id, name, address }) => {
  const classes = useStyles();
  return (
    <Card>
      <Grid container justify="space-between">
        <Grid item className={classes.listItemContent}>
          <CardActionArea
            component={Link}
            to={`/admin/companies/${id}`}
            className={classes.listItemActionArea}
          >
            <CardHeader
              title={name}
              subheader={typeof address === 'string' ? address : ''}
            />
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              component={Link}
              to={`/admin/companies/${id}/jobs`}
            >
              View Postings
            </Button>
          </CardActions>
        </Grid>
        <Hidden mdDown>
          <Grid item md={4}>
            <CardMedia className={classes.listItemMap}>hey</CardMedia>
          </Grid>
        </Hidden>
      </Grid>
    </Card>
  );
};

export const AdminCompaniesPage = () => {
  const classes = useStyles();
  const [companies, loading, error] = useCollectionData(
    db.collection('companies'),
    { idField: 'id' }
  );

  return (
    <AdminPageContainer>
      <Container className={classes.container} maxWidth="lg">
        {loading && <CircularProgress className={classes.progress} />}
        {companies && (
          <>
            <Grid container spacing={2}>
              {companies.map(company => (
                <Grid item md={6} xs={12}>
                  <AdminCompanyListItem {...company} key={company.id} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
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
    </AdminPageContainer>
  );
};

export default AdminCompaniesPage;
