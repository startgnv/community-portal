import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';

export const AdminJobList = () => {
  const [jobs, loading, error] = useCollectionData(db.collection('jobs'), {
    idField: 'id'
  });

  if (loading) {
    return <LinearProgress />;
  }
  if (error) {
    return (
      <LinearProgress variant="determinate" value={75} color="secondary" />
    );
  }

  return (
    <List>
      {jobs.map(({ title, id }) => {
        return (
          <ListItem key={id} divider button>
            <ListItemText>
              {title}
              <Link to={`/admin/jobs/${id}/edit`}>
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
};

export default AdminJobList;
