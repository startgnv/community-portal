import React, { useState } from 'react';
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
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { db, storage } from '../firebase';
import { useAdminContainer } from './AdminPageContainer';
import { Parser } from 'html-to-react';
import moment from 'moment';
import DeleteDialog from './Admin/UI/DeleteDialog';

const htmlParser = new Parser();

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

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);

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

  const onDeleteClick = () => {
    db.doc(`jobs/${jobID}`)
      .delete()
      .then(() => {
        setDeleted(true);
      })
      .catch(() => {});
  };

  const onUndeleteClick = () => {
    db.doc(`jobs/${jobID}`)
      .set(job)
      .then(() => {
        setDeleted(false);
      });
  };
  const updatedAgo = job.TSUpdated ? moment(job.TSUpdated).fromNow() : 'Never';

  return (
    <>
      <DeleteDialog
        open={confirmDelete}
        setClose={() => setConfirmDelete(false)}
        onConfirm={onDeleteClick}
        label={job.title}
        message="This job will be gone forever. You need to be really really sure you want to delete it."
      />

      {deleted && (
        <Card className={classes.jobCard}>
          <CardContent>
            <p>This job has been deleted.</p>
            <Button onClick={onUndeleteClick}>Undelete</Button>
          </CardContent>
        </Card>
      )}
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
            <>
              <IconButton
                component={Link}
                onClick={() => setConfirmDelete(true)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton component={Link} to={`/admin/jobs/${jobID}/edit`}>
                <EditIcon />
              </IconButton>
            </>
          }
        />

        <CardContent>
          <p>Updated {updatedAgo}</p>
          {htmlParser.parse(job.description)}
        </CardContent>
      </Card>
    </>
  );
};

export default AdminJobCard;
