import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core';

import { db } from '../firebase';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

export const AdminNewJobForm = () => {
  const [categories = [], loadingCategories] = useCollectionData(
    db.collection('jobCategories'),
    { idField: 'id' }
  );
  const [companies = [], loadingCompanies] = useCollectionData(
    db.collection('companies'),
    { idField: 'id' }
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const classes = useStyles();

  const onFormSubmit = e => {
    e.preventDefault();

    if (title && description && categories.length && company) {
      db.collection('/jobs')
        .doc()
        .set({
          title,
          description,
          categories: selectedCategories.map(({ value }) => value),
          company: company.value
        });
    }
  };

  const categoryOptions = categories.map(({ parentID, name }) => ({
    value: parentID,
    label: name
  }));

  const companyOptions = companies.map(({ id, name }) => ({
    value: id,
    label: name
  }));

  return (
    <form className={classes.form} onSubmit={onFormSubmit}>
      <TextField
        required
        label="Job Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextField
        required
        label="Job Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      {!loadingCompanies && (
        <Select
          label="Company"
          options={companyOptions}
          value={company}
          onChange={val => setCompany(val)}
        />
      )}
      {!loadingCategories && (
        <Select
          isMulti
          options={categoryOptions}
          value={selectedCategories}
          onChange={val => setSelectedCategories(val)}
        />
      )}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default AdminNewJobForm;
