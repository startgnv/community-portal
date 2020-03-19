import React from 'react';
import { Input } from './Input';
import Chip from '@material-ui/core/Chip';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../../firebase';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

export const IndustryForm = () => {
  const classes = useStyles();

  const [industries = [], loadingIndustries] = useCollectionData(
    db.collection('companyCategories').orderBy('name', 'asc'),
    { idField: 'id' }
  );

  const addIndustry = input => {
    if (input.length < 1) return;

    db.collection('companyCategories')
      .doc(input.toLowerCase().replace(/\s/g, ''))
      .set({
        name: input
      })
      .catch(err => {
        console.error('Error adding industry: ', err);
      });
  };

  const deleteIndustry = industryId => {
    db.collection('companyCategories')
      .doc(industryId)
      .delete()
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <>
      <Input onSubmit={addIndustry} />
      <div className={classes.chipContainer}>
        {industries.map(({ name, id }) => (
          <Chip
            key={id}
            label={name}
            onDelete={() => deleteIndustry(id)}
            className={classes.chip}
          />
        ))}
      </div>
    </>
  );
};
