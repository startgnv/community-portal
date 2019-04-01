import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';

export const AdminHeader = ({ backTo, ...props }) => (
  <AppBar position="fixed" {...props}>
    <Toolbar>
      {backTo && (
        <IconButton component={Link} color="inherit" to={backTo}>
          <BackIcon />
        </IconButton>
      )}
      <Typography variant="h6">StartupGNV</Typography>
    </Toolbar>
  </AppBar>
);

export default AdminHeader;
