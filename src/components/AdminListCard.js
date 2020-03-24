import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import {
  CardActionArea,
  Avatar,
  Typography,
  CardContent
} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { db, storage } from '../firebase';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import DeleteDialog from './Admin/DeleteDialog';

const useStyles = makeStyles({
  listItemArea: {
    backgroundImage: ({ coverSrc }) => `url('${coverSrc}')`,
    backgroundColor: '#444',
    backgroundSize: 'cover'
  },
  listItemAvatar: {
    width: 70,
    height: 70,
    margin: 20,
    border: '3px solid white'
  }
});

export const AdminListCard = ({
  linkTo,
  logoPath,
  coverPath,
  label,
  labelVariant = 'h6',
  onDelete
}) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [logoSrc] = useDownloadURL(logoPath ? storage.ref(logoPath) : '');
  const [coverSrc] = useDownloadURL(coverPath ? storage.ref(coverPath) : '');

  const classes = useStyles({ coverSrc });

  return (
    <>
      <DeleteDialog
        open={openDelete}
        setClose={() => setOpenDelete(false)}
        onConfirm={onDelete}
        label={label}
        message="Are you sure you would like to remove this company?"
      />

      <Card>
        <CardActionArea
          component={Link}
          className={classes.listItemArea}
          to={linkTo}
        >
          <CardContent>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Avatar
                  src={logoSrc}
                  size={40}
                  className={classes.listItemAvatar}
                />
              </Grid>
              <Box maxWidth="100%" clone>
                <Grid item>
                  <Box
                    boxSizing="borderBox"
                    px={2}
                    width="100%"
                    maxWidth="100%"
                    borderRadius={5}
                    bgcolor="white"
                    fontWeight="fontWeightLight"
                    clone
                  >
                    <Typography variant={labelVariant}>{label}</Typography>
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => setOpenDelete(true)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AdminListCard;
