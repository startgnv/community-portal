import React, { useState, useRef, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

import { db } from '../firebase';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2)
  }
}));

export const AdminJobForm = ({
  match: {
    params: { jobID }
  }
}) => {
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
  const [companyID, setCompanyID] = useState();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [savingSuccess, setSavingSuccess] = useState(false);
  const [savingError, setSavingError] = useState(false);

  const doc = useRef(db.collection('jobs').doc(...(jobID ? [jobID] : [])));
  const [loadingJob, setLoadingJob] = useState(!!jobID);
  useEffect(() => {
    if (jobID) {
      doc.current.get().then(snapshot => {
        const job = snapshot.data();
        setTitle(job.title);
        setDescription(job.description);
        setCompanyID(job.companyID);
        setSelectedCategories(job.categories);
        setLoadingJob(false);
      });
    }
  }, [jobID]);

  const classes = useStyles();

  const onFormSubmit = e => {
    e.preventDefault();

    if (title && description && selectedCategories.length && companyID) {
      setSaving(true);
      setSavingError(false);
      setSavingSuccess(false);

      doc.current
        .set({
          title,
          description,
          categories: selectedCategories,
          companyID
        })
        .then(() => {
          setSaving(false);
          setSavingSuccess(true);
          setSavingError(false);
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

  if (loadingCategories || loadingCompanies || loadingJob) {
    return <LinearProgress />;
  }

  return (
    <form component="form" className={classes.form} onSubmit={onFormSubmit}>
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
          value={companyOptions.find(({ value }) => companyID === value)}
          onChange={({ value }) => setCompanyID(value)}
        />
      )}
      {!loadingCategories && (
        <Select
          isMulti
          options={categoryOptions}
          value={selectedCategories.map(cat =>
            categoryOptions.find(opt => opt.value === cat)
          )}
          onChange={selected =>
            setSelectedCategories(selected.map(({ value }) => value))
          }
        />
      )}
      <Button disabled={saving} type="submit">
        Submit
      </Button>
      {saving && <LinearProgress />}
      {savingSuccess && 'Saved!'}
      {savingError && 'Failed to save!'}
    </form>
  );
};

export default AdminJobForm;
