import React, { useState, createContext, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Hidden from '@material-ui/core/Hidden';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from '@material-ui/core/Drawer';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import SyncIcon from '@material-ui/icons/Sync';

import AdminHeader from './AdminHeader';

export const AdminContainerContext = createContext({
  setBackTo: () => {}
});

export const useAdminContainer = ({ backTo, loading }) => {
  const { setBackTo, setLoading } = useContext(AdminContainerContext);

  useEffect(() => {
    setBackTo(backTo);
    setLoading(loading);

    return () => {
      setBackTo();
      setLoading(false);
    };
  }, [setBackTo, setLoading, backTo, loading]);
};

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  active: {
    backgroundColor: '#f0f0f0'
  },
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 10000
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerList: {
    '& a:visited, & a:hover, & a:active': {
      color: theme.palette.text.primary,
      fontWeight: 800
    }
  },
  header: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`
  },
  content: {
    flexGrow: 1
  },
  loading: {
    position: 'fixed',
    width: '100%'
  },
  root: {
    display: 'flex',
    backgroundColor: '#fcfcfc'
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  toolbarBuffer: theme.mixins.toolbar
}));

export const BottomNavigationLink = props => (
  <BottomNavigationAction component={Link} {...props} to={props.value} />
);

const ListItemLink = ({ children, ...props }) => (
  <ListItem component={React.forwardRef(NavLink)} {...props}>
    {children}
  </ListItem>
);

export const AdminPageContainer = ({ children, location }) => {
  const classes = useStyles();
  const [backTo, setBackTo] = useState('');
  const [loading, setLoading] = useState(false);

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
        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawer }}
          variant="permanent"
          anchor="left"
        >
          <div className={classes.toolbarBuffer} />
          <Divider />
          <List className={classes.drawerList}>
            <ListItemLink to="/admin" exact activeClassName={classes.active}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText color="text.primary" fontWeight="200">
                Home
              </ListItemText>
            </ListItemLink>
            <ListItemLink
              to="/admin/companies"
              activeClassName={classes.active}
            >
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText color="text.primary" fontWeight="200">
                Companies
              </ListItemText>
            </ListItemLink>
            <ListItemLink
              to="/admin/jobs"
              activeClassName={classes.active}
              exact
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText color="text.primary" fontWeight="200">
                Jobs
              </ListItemText>
            </ListItemLink>
            <Collapse
              in={location.pathname.includes('jobs')}
              timeout="auto"
              unmountOnExit
            >
              <List>
                <ListItemLink
                  to="/admin/jobs/sync"
                  activeClassName={classes.active}
                  className={classes.nested}
                >
                  <ListItemIcon>
                    <SyncIcon />
                  </ListItemIcon>
                  <ListItemText color="text.primary" fontWeight="200">
                    Sync
                  </ListItemText>
                </ListItemLink>
              </List>
            </Collapse>
            <ListItemLink to="/admin/settings" activeClassName={classes.active}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText color="text.primary" fontWeight="200">
                Settings
              </ListItemText>
            </ListItemLink>
          </List>
        </Drawer>
      </Hidden>

      <div className={classes.content}>
        <Hidden mdUp>
          <div className={classes.toolbarBuffer} />
        </Hidden>
        {loading && <LinearProgress classes={{ root: classes.loading }} />}

        <AdminContainerContext.Provider
          value={{
            setBackTo,
            setLoading
          }}
        >
          {children}
        </AdminContainerContext.Provider>

        <Hidden mdUp>
          <div className={classes.toolbarBuffer} />
        </Hidden>
      </div>
    </div>
  );
};

export default withRouter(AdminPageContainer);
