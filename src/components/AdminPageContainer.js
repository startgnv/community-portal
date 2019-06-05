import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Hidden from '@material-ui/core/Hidden';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

import AdminHeader from './AdminHeader';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  active: {
    backgroundColor: 'green'
  },
  bottomNav: {
    position: 'fixed',
    bottom: 0
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  header: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`
  },
  content: {
    flexGrow: 1
  },
  root: {
    display: 'flex'
  },
  toolbarBuffer: theme.mixins.toolbar
}));

export const BottomNavigationLink = props => (
  <BottomNavigationAction component={Link} {...props} to={props.value} />
);

export const AdminPageContainer = ({ children, backTo = '', location }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Hidden mdUp>
        <AdminHeader backTo={backTo} />
        <BottomNavigation
          className={classes.bottomNav}
          showLabels
          value={location.pathname
            .split('/')
            .slice(0, 3)
            .join('/')}
        >
          <BottomNavigationLink
            icon={<HomeIcon />}
            value="/admin"
            label="Home"
          />
          <BottomNavigationLink
            icon={<BusinessIcon />}
            value="/admin/companies"
            label="Companies"
          />
          <BottomNavigationLink
            icon={<PeopleIcon />}
            value="/admin/jobs"
            label="Jobs"
          />
          <BottomNavigationLink
            icon={<SettingsIcon />}
            value="/admin/settings"
            label="Settings"
          />
        </BottomNavigation>
      </Hidden>

      <Hidden smDown>
        <AdminHeader backTo={backTo} className={classes.header} />
        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawer }}
          variant="permanent"
          anchor="left"
        >
          <div className={classes.toolbarBuffer} />
          <Divider />
          <List>
            <ListItem
              component={NavLink}
              to="/admin"
              exact
              activeClassName={classes.active}
            >
              <ListItemText>Home</ListItemText>
            </ListItem>
            <ListItem
              component={NavLink}
              to="/admin/companies"
              activeClassName={classes.active}
            >
              <ListItemText>Companies</ListItemText>
            </ListItem>
            <ListItem
              component={NavLink}
              to="/admin/jobs"
              activeClassName={classes.active}
            >
              <ListItemText>Jobs</ListItemText>
            </ListItem>
            <ListItem
              component={NavLink}
              to="/admin/settings"
              activeClassName={classes.active}
            >
              <ListItemText>Settings</ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </Hidden>

      <div className={classes.content}>
        <div className={classes.toolbarBuffer} />
        {children}
      </div>
    </div>
  );
};

export default withRouter(AdminPageContainer);
