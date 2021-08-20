import _ from 'lodash';
import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Link from 'src/components/Site/UI/Link';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import StorageAvatar from 'src/components/Admin/Jobs/StorageAvatar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';

import { db } from 'src/firebase';
import { useAdminContainer } from 'src/components/Admin/UI/PageContainer';
import ListFilter, { sortKeys } from 'src/components/Admin/UI/ListFilter';
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

export const JobsPage = () => {
  const classes = useStyles();

  // Published controls
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ by: 'Updated', asc: false });

  // Unpublished controls
  const [unpublishedSearch, setUnpublishedSearch] = useState('');
  const [unpublishedSort, setUnpublishedSort] = useState({
    dy: 'Updated',
    asc: false
  });

  // Archived controls
  const [archivedSearch, setArchivedSearch] = useState('');
  const [archivedSort, setArchivedSort] = useState({
    dy: 'Updated',
    asc: false
  });

  const [draftJobs = [], draftJobsLoading] = useCollectionData(
    db.collection(
      process.env.REACT_APP_ENVIRONMENT === 'test'
        ? 'draftJobsTest'
        : 'draftJobs'
    ),
    { idField: 'id' }
  );

  const [jobsSrc = [], loadingJobs, errorJobs] = useCollectionData(
    db.collection(
      process.env.REACT_APP_ENVIRONMENT === 'test' ? 'jobsTest' : 'jobs'
    ),
    {
      idField: 'id'
    }
  );

  const [archivedJobs = [], archivedLoading, archivedError] = useCollectionData(
    db.collection(
      process.env.REACT_APP_ENVIRONMENT === 'test'
        ? 'archivedJobsTest'
        : 'archivedJobs'
    ),
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

  // Include only jobs that are are in the drafts list, but not the published list,
  // implying it's a new job that has not yet been released
  const unpublishedJobs = draftJobs.filter(
    job => !jobsSrc.find(j => j.id === job.id)
  );

  const publishedJobs = jobsSrc.reduce((acc, job) => {
    const draft = draftJobs.find(d => d.id === job.id);

    if (!draft) {
      return [...acc, job];
    }

    return draft ? [...acc, draft] : [...acc, job];
  }, []);

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
      draftCompaniesLoading ||
      archivedLoading
  });

  const companiesByID = _.keyBy(companies, company => company.id);

  return (
    <>
      <Container className={classes.container} maxWidth="lg">
        {unpublishedJobs && unpublishedJobs.length > 0 && (
          <ListFilter
            search={unpublishedSearch}
            searchLabel="Search Unpublished Jobs"
            setSearch={setUnpublishedSearch}
            sort={unpublishedSort}
            setSort={setUnpublishedSort}
          />
        )}

        <List>
          {unpublishedJobs
            .filter(({ title }) =>
              title.toLowerCase().includes(unpublishedSearch.toLowerCase())
            )
            .sort((a, b) => {
              const sortAttr = sortKeys[unpublishedSort.by];
              const aVal = a[sortAttr] || 0;
              const bVal = b[sortAttr] || 0;
              if (unpublishedSort.asc) {
                return aVal - bVal;
              } else {
                return bVal - aVal;
              }
            })
            .map(job => {
              const company = companiesByID[job.companyID] || {};
              return (
                <ListItemLink
                  href={`/admin/jobs/${job.id}`}
                  key={job.id}
                  data-test-id={`job-unpublished-${job.id}`}
                >
                  <ListItemAvatar>
                    <StorageAvatar
                      path={company.logoPath}
                      avatarProps={{ style: { width: '40px' } }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={job.title}
                    secondary={
                      company.name
                        ? company.name
                        : `${job.companyName} (unverified)`
                    }
                  />
                </ListItemLink>
              );
            })}
        </List>

        <ListFilter
          search={search}
          searchLabel="Search Jobs"
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
        />

        <List>
          {publishedJobs
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
              const daysOld = moment().diff(job.TSCreated, 'days');
              const olderThanThirty =
                job.TSCreated &&
                parseInt(moment().diff(job.TSCreated, 'days'), 10) > 30;
              return (
                <ListItemLink
                  href={`/admin/jobs/${job.id}`}
                  key={job.id}
                  data-test-id={`job-published-${job.id}`}
                >
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
                  <ListItemText
                    primary={job.title}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {company.name}
                        </Typography>
                        {olderThanThirty && (
                          <Typography
                            component="span"
                            variant="body"
                            className={classes.inline}
                            color="error"
                          >
                            {` ${daysOld} days old`}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItemLink>
              );
            })}
        </List>

        {archivedJobs && archivedJobs.length > 0 && (
          <ListFilter
            search={archivedSearch}
            searchLabel="Search Archived Jobs"
            setSearch={setArchivedSearch}
            sort={archivedSort}
            setSort={setArchivedSort}
          />
        )}

        <List>
          {archivedJobs
            .filter(({ title }) =>
              title.toLowerCase().includes(archivedSearch.toLowerCase())
            )
            .sort((a, b) => {
              const sortAttr = sortKeys[archivedSort.by];
              const aVal = a[sortAttr] || 0;
              const bVal = b[sortAttr] || 0;
              if (unpublishedSort.asc) {
                return aVal - bVal;
              } else {
                return bVal - aVal;
              }
            })
            .map(job => {
              const company = companiesByID[job.companyID] || {};
              return (
                <ListItemLink
                  href={`/admin/jobs/${job.id}`}
                  key={job.id}
                  data-test-id={`job-unpublished-${job.id}`}
                >
                  <ListItemAvatar>
                    <StorageAvatar
                      path={company.logoPath}
                      avatarProps={{ style: { width: '40px' } }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={job.title}
                    secondary={
                      company.name
                        ? company.name
                        : `${job.companyName} (unverified)`
                    }
                  />
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
        data-test-id="add-icon"
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
