import React from 'react';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import {
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { db, storage } from '../firebase';
import { useAdminContainer } from './AdminPageContainer';

const useStyles = makeStyles(theme => ({
  jobCard: {
    margin: theme.spacing(2)
  },
  jobMedia: {
    height: 200
  }
}));

const AdminJobSubheader = ({
  category = 'General Role',
  company = 'UKNOWN COMPANY',
  salary = 'Competitive Pay',
  applyURL = 'http://jobvite.com/listing-5'
}) => (
  <>
    <div>{company}</div>
    <div>
      {category}, {salary}
    </div>
    <div>{applyURL}</div>
  </>
);

const AdminJobCard = ({
  match: {
    params: { jobID }
  }
}) => {
  const classes = useStyles();
  let [job, loading] = useDocumentDataOnce(db.doc(`jobs/${jobID}`), {
    idField: 'id'
  });

  const [company, loadingCompany] = useDocumentDataOnce(
    job && db.doc(`companies/${job.companyID}`)
  );
  const [coverImgURL] = useDownloadURL(
    job && storage.ref(`companyCovers/${job.companyID}`)
  );

  useAdminContainer({
    loading: loading || loadingCompany,
    backTo: '/admin/jobs'
  });

  if (loading || loadingCompany) {
    return false;
  }

  if (job === null) {
    return 'Job does not exist';
  }

  return (
    <Card className={classes.jobCard}>
      <CardMedia className={classes.jobMedia} image={coverImgURL} />
      <CardHeader
        title={job.title}
        subheader={
          <AdminJobSubheader
            category={job.category}
            company={company ? company.name : undefined}
            salary={job.salary}
            applyURL={job.applyURL}
          />
        }
        action={
          <IconButton component={Link} to={`/admin/jobs/${jobID}/edit`}>
            <EditIcon />
          </IconButton>
        }
      />

      <CardContent>{job.description}</CardContent>
    </Card>
  );
};

export default AdminJobCard;
