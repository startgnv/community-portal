import React, { useEffect, useState } from 'react';
import {
  useDocumentDataOnce,
  useCollectionData
} from 'react-firebase-hooks/firestore';
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
import { db, storage } from '../../../firebase';
import { useAdminContainer } from '../UI/PageContainer';
import { Parser } from 'html-to-react';
import moment from 'moment';
import DeleteDialog from '../UI/DeleteDialog';

const htmlParser = new Parser();

const useStyles = makeStyles(theme => ({
  jobCard: {
    margin: theme.spacing(2)
  },
  jobMedia: {
    height: 200
  }
}));

const JobSubHeader = ({
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

const DisplayPage = ({
  match: {
    params: { jobID }
  }
}) => {
  const classes = useStyles();
  const [publishedJob, setPublishedJob] = useState(null);
  const [draftJob, setDraftJob] = useState(null);
  const [archivedJob, setArchivedJob] = useState(null);
  const [job, setJob] = useState(null);
  const [isDraft, setDraft] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [loading, setLoading] = useState(true);

  const [jobsSrc = [], jobsLoading, error] = useCollectionData(
    db.collection('jobs'),
    { idField: 'id' }
  );

  const [drafts = [], draftsLoading] = useCollectionData(
    db.collection('jobDrafts'),
    { idField: 'id' }
  );

  const jobs = jobsSrc.reduce((acc, job) => {
    const draft = drafts.find(d => d.id === job.id);

    if (!draft) {
      return [...acc, job];
    }

    return draft ? [...acc, draft] : [...acc, job];
  }, []);

  const unpublishedJobs = drafts.filter(
    job => !jobsSrc.find(j => j.id === job.id)
  );

  const publishedJobs = jobsSrc.reduce((acc, job) => {
    const draft = drafts.find(d => d.id === job.id);

    if (!draft) {
      return [...acc, job];
    }

    return draft ? [...acc, draft] : [...acc, job];
  }, []);

  useEffect(() => {
    db.collection(
      process.env.REACT_APP_ENVIRONMENT === 'test'
        ? 'draftJobsTest'
        : 'draftJobs'
    )
      .doc(jobID)
      .get()
      .then(snapshot => {
        if (snapshot.exists && snapshot.data().title) {
          setDraftJob({ id: snapshot.id, ...snapshot.data() });
          setDraft(true);
          setLoading(false);
        } else {
          db.collection(
            process.env.REACT_APP_ENVIRONMENT === 'test'
              ? 'archivedJobsTest'
              : 'archivedJobs'
          )
            .doc(jobID)
            .get()
            .then(snapshot => {
              if (snapshot.exists && snapshot.data().title) {
                setArchivedJob({ id: snapshot.id, ...snapshot.data() });
                setIsArchived(true);
                setLoading(false);
              } else {
                return db
                  .collection(
                    process.env.REACT_APP_ENVIRONMENT === 'test'
                      ? 'jobsTest'
                      : 'jobs'
                  )
                  .doc(jobID)
                  .get();
              }
            })
            .then(snapshot => {
              setPublishedJob({ id: snapshot.id, ...snapshot.data() });
              setLoading(false);
            })
            .catch(() => {
              setLoading(false);
            });
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (draftJob) {
      setJob(draftJob);
    } else if (archivedJob) {
      setJob(archivedJob);
    } else if (publishedJob) {
      setJob(publishedJob);
    }
  }, [publishedJob, draftJob, archivedJob]);

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
    const jobDoc = [...publishedJobs, ...unpublishedJobs].find(
      j => j.id === jobID
    );
    if (!jobDoc) return;

    // Remove the id key so it isn't stored twice in firestore
    delete jobDoc.id;
    db.collection(
      process.env.REACT_APP_ENVIRONMENT === 'test'
        ? 'archivedJobsTest'
        : 'archivedJobs'
    )
      .doc(jobID)
      .set(jobDoc)
      .then(() => {
        db.collection('jobs')
          .doc(jobID)
          .delete()
          .then(() => {
            setDeleted(true);
          });

        db.collection('jobDrafts')
          .doc(jobID)
          .delete()
          .then(() => {
            setDeleted(true);
          });
      })
      .catch(() => {});
  };

  const onUndeleteClick = () => {
    db.doc(`jobs/${jobID}`)
      .set(job)
      .then(() => {
        if (isDraft) {
          return db.doc(`draftJobs/${jobID}`).set(job);
        } else if (isArchived) {
          return db.doc(`archivedJobs/${jobID}`).set(job);
        } else {
          setDeleted(false);
        }
      })
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
            <JobSubHeader
              category={job.category}
              company={company ? company.name : job.companyName}
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

export default DisplayPage;
