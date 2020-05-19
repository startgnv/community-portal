import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

import { useAdminContainer } from '../UI/PageContainer';
import ListCard from './ListCard';
import { db } from '../../../firebase';
import ListFilter, { sortKeys } from '../UI/ListFilter';

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

export const CompaniesPage = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ by: 'Updated', asc: false });
  const [companiesSrc = [], loading, error] = useCollectionData(
    db.collection('companies'),
    { idField: 'id' }
  );

  const [drafts = [], draftsLoading] = useCollectionData(
    db.collection('companyDrafts'),
    { idField: 'id' }
  );

  const companies = companiesSrc.map(company => {
    const draft = drafts.find(d => d.id === company.id);

    if (draft && draft.TSCreated) {
      console.log(draft);
      return draft;
    } else return company;
  });

  useAdminContainer({ loading: loading || draftsLoading });

  const deleteCompany = companyID => () => {
    const companyDoc = companiesSrc.find(c => c.id === companyID);
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ListFilter
              search={search}
              sort={sort}
              setSearch={setSearch}
              setSort={setSort}
            />
          </Grid>
          {companies
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
                  coverPath={coverPath.replace('Cover', 'Listing')}
                  logoPath={logoPath}
                  label={name}
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
