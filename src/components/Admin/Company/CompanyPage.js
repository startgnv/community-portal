import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useDownloadURL } from 'react-firebase-hooks/storage';

import { db, storage } from '../../../firebase';
import { useAdminContainer } from '../UI/PageContainer';
import UploadAvatar from './UploadAvatar';
import UploadCoverImage from './UploadCoverImage';

const useStyles = makeStyles({
  avatar: {
    transform: 'translate(30px, -70px)',
    position: 'absolute',
    '& .img': {
      border: '2px solid white'
    }
  }
});

const CompanyPage = ({
  match: {
    params: { companyID }
  }
}) => {
  const [
    { name = 'UNNAMED COMPANY', coverPath = '', logoPath = '' } = {},
    loading
  ] = useDocumentData(db.doc(`companies/${companyID}`), {
    idField: 'companyID'
  });

  const [logoURL, logoURLLoading] = useDownloadURL(
    logoPath ? storage.ref(logoPath) : null
  );
  const [coverURL, coverURLLoading] = useDownloadURL(
    coverPath ? storage.ref(coverPath) : null
  );

  const classes = useStyles();

  const backTo = '/admin/companies';
  useAdminContainer({
    backTo,
    loading: loading || logoURLLoading || coverURLLoading
  });

  if (loading) {
    return false;
  }

  return (
    <Grid container justify="center">
      <Grid item md={8} xs={12}>
        <UploadCoverImage
          companyID={companyID}
          src={coverURL}
          onUploadComplete={coverPath => {
            db.doc(`companies/${companyID}`).update({ coverPath });
          }}
        />
        <UploadAvatar
          companyID={companyID}
          src={logoURL}
          className={classes.avatar}
          onUploadComplete={logoPath =>
            db.doc(`companies/${companyID}`).update({ logoPath })
          }
        />
        <Box display="flex" flexDirection="row-reverse">
          <IconButton
            component={Link}
            to={`/admin/companies/${companyID}/edit`}
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Box m={2}>
          <Typography variant="h4">{name}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CompanyPage;
