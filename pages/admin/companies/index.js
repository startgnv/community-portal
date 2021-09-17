import React, { useState } from 'react';
import Link from 'src/components/Site/UI/Link';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

import { useAdminContainer } from 'src/components/Admin/UI/PageContainer';
import ListCard from 'src/components/Admin/Companies/ListCard';
import { db } from 'src/firebase';
import ListFilter, { sortKeys } from 'src/components/Admin/UI/ListFilter';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import StorageAvatar from 'src/components/Admin/Jobs/StorageAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  fab: {
    position: 'absolute',
    bottom: '100px',
    right: '20px'
  },
  container: {
    marginTop: '20px'
  },
  progress: {
    display: 'block',
    margin: 'auto'
  }
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export const CompaniesPage = () => {
  const classes = useStyles();

  // Published Controls
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ by: 'Updated', asc: false });

  // Unpublished Controls
  const [unpublishedSearch, setUnpublishedSearch] = useState('');
  const [unpublishedSort, setUnpublishedSort] = useState({
    dy: 'Updated',
    asc: false
  });

  const [companiesSrc = [], loading, error] = useCollectionData(
    db.collection('companies'),
    { idField: 'id' }
  );

  const [drafts = [], draftsLoading] = useCollectionData(
    db.collection('companyDrafts'),
    { idField: 'id' }
  );

  const unpublishedCompanies = drafts.filter(
    company => !companiesSrc.find(c => c.id === company.id)
  );

  const publishedCompanies = companiesSrc.reduce((acc, company) => {
    const draft = drafts.find(d => d.id === company.id);

    if (!draft) {
      return [...acc, company];
    }

    return draft ? [...acc, draft] : [...acc, company];
  }, []);

  useAdminContainer({ loading: loading || draftsLoading });

  const deleteCompany = companyID => () => {
    const companyDoc = [...publishedCompanies, ...unpublishedCompanies].find(
      c => c.id === companyID
    );
    if (!companyDoc) return;

    // Remove the id key so it isn't stored twice in firestore
    delete companyDoc.id;

    db.collection('archivedCompanies')
      .doc(companyID)
      .set(companyDoc)
      .then(() => {
        db.collection('companies')
          .doc(companyID)
          .delete();

        db.collection('companyDrafts')
          .doc(companyID)
          .delete();
      })
      .catch(() => {});
  };

  return (
    <>
      <Container className={classes.container} maxWidth="lg">
        {unpublishedCompanies && unpublishedCompanies.length > 0 && (
          <ListFilter
            search={unpublishedSearch}
            searchLabel="Search Unpublished Companies"
            setSearch={setUnpublishedSearch}
            sort={unpublishedSort}
            setSort={setUnpublishedSort}
          />
        )}

        <List>
          {unpublishedCompanies
            .filter(({ name = '', featured = false }) => {
              let match;
              const normalizedSearch = search.toLowerCase();
              const isFeatured = featured ? 'featured' : '';
              match =
                name.toLowerCase().includes(normalizedSearch) ||
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
            .map(company => {
              return (
                <ListItem
                  key={company.id}
                  alignItems="center"
                  style={{ justifyContent: 'space-between' }}
                >
                  <div style={{ display: 'flex' }}>
                    <ListItemAvatar>
                      <StorageAvatar
                        path={company.logoPath}
                        avatarProps={{ style: { width: '40px' } }}
                      />
                    </ListItemAvatar>
                    <a
                      href={`/admin/companies/${company.id}/edit`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <ListItemText primary={company.name} />
                    </a>
                  </div>

                  <IconButton
                    aria-label="delete"
                    onClick={deleteCompany(company.id)}
                  >
                    <DeleteIcon color="action" />
                  </IconButton>
                </ListItem>
              );
            })}
        </List>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ListFilter
              search={search}
              sort={sort}
              setSearch={setSearch}
              setSort={setSort}
              searchLabel="Search Archived Jobs"
            />
          </Grid>
          {publishedCompanies
            .filter(({ name = '', featured = false }) => {
              let match;
              const normalizedSearch = search.toLowerCase();
              const isFeatured = featured ? 'featured' : '';
              match =
                name.toLowerCase().includes(normalizedSearch) ||
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
            .map(({ name, id, coverPath, logoPath }) => (
              <Grid key={id} item md={4} xs={12}>
                <ListCard
                  key={id}
                  coverPath={
                    coverPath ? coverPath.replace('Cover', 'Listing') : ''
                  }
                  logoPath={logoPath}
                  label={name}
                  isDraft={!!drafts.find(d => d.id === id)}
                  linkTo={`/admin/companies/${id}/edit`}
                  onDelete={deleteCompany(id)}
                />
              </Grid>
            ))}
        </Grid>
        {error && (
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
        to="/admin/companies/new"
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default CompaniesPage;
