import React from 'react';
import Chip from '@material-ui/core/Chip';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../../firebase';
import { makeStyles } from '@material-ui/core';
import { InputWithRadio } from './InputWithRadio';
import _ from 'lodash';

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

export const CategoryForm = () => {
  const classes = useStyles();

  const [categories = [], loadingCategories] = useCollectionData(
    db.collection('jobCategories').orderBy('name', 'asc'),
    { idField: 'id' }
  );

  const addCategory = (input, parentID) => {
    if (input.length < 1) return;

    db.collection('jobCategories')
      .doc(input.toLowerCase().replace(/\s/g, ''))
      .set({
        name: input,
        parentID
      })
      .catch(err => {
        console.error('Error adding Category: ', err);
      });
  };

  const deleteCategory = categoryId => {
    db.collection('jobCategories')
      .doc(categoryId)
      .delete()
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <>
      <InputWithRadio
        placeholder="Add a Category"
        onSubmit={addCategory}
        options={_.uniqBy(categories, 'parentID').filter(
          cat => cat.parentID && cat.parentID.length > 0
        )}
      />
      <div className={classes.chipContainer}>
        {categories.map(({ name, id }) => (
          <Chip
            key={id}
            label={name}
            onDelete={() => deleteCategory(id)}
            className={classes.chip}
          />
        ))}
      </div>
    </>
  );
};
