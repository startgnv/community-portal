import _ from 'lodash';
import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import StorageAvatar from './StorageAvatar';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';

import { db } from '../../../firebase';
import { useAdminContainer } from '../UI/PageContainer';
import ListFilter, { sortKeys } from '../UI/ListFilter';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  container: {
    marginTop: '20px'
  },
  progress: {
    display: 'block',
    margin: 'auto'
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export const JobsPage = ({ match: { isExact } }) => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ by: 'Updated', asc: false });

  const [draftJobs = [], draftJobsLoading] = useCollectionData(
    db.collection('draftJobs'),
    { idField: 'id' }
  );

  const [jobsSrc = [], loadingJobs, errorJobs] = useCollectionData(
    db.collection('jobs'),
    {
      idField: 'id'
    }
  );

  const [draftCompanies = [], draftCompaniesLoading] = useCollectionData(
    db.collection('companyDrafts'),
    { idField: 'id' }
  );

  const [
    companiesSrc = [],
    loadingCompanies,
    errorCompanies
  ] = useCollectionData(db.collection('companies'), {
    idField: 'id'
  });

  const jobs = jobsSrc.reduce(
    (acc, job) => {
      const draft = acc.find(d => d.id === job.id);

      if (!draft) {
        return [...acc, job];
      }

      return acc;
    },
    [...draftJobs]
  );

  const companies = companiesSrc.reduce(
    (acc, company) => {
      const draft = acc.find(d => d.id === company.id);

      if (!draft) {
        return [...acc, company];
      }

      return acc;
    },
    [...draftCompanies]
  );

  useAdminContainer({
    loading:
      loadingJobs ||
      loadingCompanies ||
      draftJobsLoading ||
      draftCompaniesLoading
  });

  const companiesByID = _.keyBy(companies, company => company.id);

  return (
    <>
      <Container className={classes.container} maxWidth="lg">
        <ListFilter
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
        />

        <List>
          {jobs
            .filter(({ title, companyID, featured }) => {
              let match;
              const normalizedSearch = search.toLowerCase();
              const companyName = companiesByID[companyID]
                ? companiesByID[companyID].name
                : '';
              const isFeatured = featured ? 'featured' : '';
              match =
                title.toLowerCase().includes(normalizedSearch) ||
                companyName.toLowerCase().includes(normalizedSearch) ||
                isFeatured.includes(normalizedSearch);
              return match;
            })
            .sort((a, b) => {
              const sortAttr = sortKeys[sort.by];
              const aVal = a[sortAttr] || 0;
              const bVal = b[sortAttr] || 0;
              if (sort.asc) {
                return aVal - bVal;
              } else {
                return bVal - aVal;
              }
            })
            .map(job => {
              const company = companiesByID[job.companyID] || {};
              return (
                <ListItemLink href={`/admin/jobs/${job.id}`} key={job.id}>
                  <ListItemAvatar>
                    <Badge
                      color="secondary"
                      badgeContent=" "
                      variant="dot"
                      invisible={!draftJobs.find(d => d.id === job.id)}
                    >
                      <StorageAvatar
                        path={company.logoPath}
                        avatarProps={{ style: { width: '40px' } }}
                      />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText primary={job.title} secondary={company.name} />
                </ListItemLink>
              );
            })}
        </List>
        {(errorJobs || errorCompanies) && (
          <CircularProgress
            value="75"
            variant="determinate"
            color="secondary"
          />
        )}
      </Container>

      <Fab
        className={classes.fab}
        color="primary"
        component={Link}
        to="/admin/jobs/new"
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default JobsPage;
