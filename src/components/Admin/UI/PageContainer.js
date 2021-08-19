import React, { useState, createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from '../../Site/UI/Link';
import { makeStyles } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Hidden from '@material-ui/core/Hidden';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

import Header from '../Header/Header';

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
    backgroundColor: '#f0f0f0',
    borderRadius: 10
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
    padding: 10,
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
  toolbarBuffer: theme.mixins.toolbar
}));

export const BottomNavigationLink = props => (
  <BottomNavigationAction component={Link} {...props} to={props.value} />
);

const ListItemLink = ({ label, ...props }) => (
  <ListItem key={label} component={NavLink} {...props}>
    <ListItemText color="text.primary" fontWeight="200">
      {label}
    </ListItemText>
  </ListItem>
);

export const PageContainer = ({ children }) => {
  const classes = useStyles();
  const [backTo, setBackTo] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useRouter();

  return (
    <div className={classes.root}>
      <Hidden mdUp>
        <Header backTo={backTo} />
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
            icon={<PeopleIcon />}
            value="/admin/ecosystem"
            label="Ecosystem"
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
            <ListItemLink
              to="/admin"
              exact
              activeClassName={classes.active}
              label="Home"
            />
            <ListItemLink
              to="/admin/companies"
              activeClassName={classes.active}
              label="Companies"
            />
            <ListItemLink
              to="/admin/jobs"
              activeClassName={classes.active}
              label="Jobs"
            />
            <List className={classes.drawerList}>
              <ListItemLink
                to="/admin/jobs/import"
                activeClassName={classes.active}
                label="Import Jobs"
              />
            </List>
            <ListItemLink
              to="/admin/ecosystem"
              activeClassName={classes.active}
              label="Ecosystem"
            />
            <ListItemLink
              to="/admin/settings"
              activeClassName={classes.active}
              label="Settings"
            />
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

export default PageContainer;
