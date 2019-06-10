import React from 'react';
import {
  useDocumentDataOnce,
  useCollectionData
} from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core';

import { storage, db } from '../firebase';
import AdminPageContainer from './AdminPageContainer';
import UploadAvatar from './UploadAvatar';

const useStyles = makeStyles({
  container: {
    marginTop: '30px'
  }
});

const AdminCompanyPage = ({
  match: {
    params: { companyID }
  }
}) => {
  const [company, loading] = useDocumentDataOnce(
    db.doc(`companies/${companyID}`),
    { idField: 'id' }
  );
  const [jobs = [], loadingJobs] = useCollectionData(
    db.collection('jobs').where('companyID', '==', companyID),
    { idField: 'id' }
  );

  const classes = useStyles();

  return (
    <AdminPageContainer backTo="/admin/companies">
      {loading && <LinearProgress />}
      {company && (
        <>
          <Grid container justify="space-between">
            <Grid item md={6} xs={12}>
              <Grid
                container
                className={classes.container}
                direction="column"
                alignItems="center"
                justify="center"
              >
                <UploadAvatar companyID={companyID} />
                <Typography variant="h4">{company.name}</Typography>
                {company.id}
              </Grid>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card>
                <CardContent>
                  <List>
                    {jobs.map(({ title, id }, i) => (
                      <ListItem
                        button
                        component={Link}
                        to={`/admin/jobs/${id}`}
                      >
                        {title}
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </AdminPageContainer>
  );
};

export default AdminCompanyPage;
