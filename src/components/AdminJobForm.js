import React, { useState, useRef, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import Select from 'react-select';

import { db } from '../firebase';
import { useAdminContainer } from './AdminPageContainer';
import FormCardPage from './FormCardPage';

export const AdminJobForm = ({
  match: {
    params: { jobID }
  },
  history: { replace = () => {} }
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

  const backTo = jobID ? `/admin/jobs/${jobID}` : '/admin/jobs';
  useAdminContainer({
    backTo,
    loading: loadingCategories || loadingCompanies || loadingJob
  });

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

  return (
    <FormCardPage title="Job Details" onSubmit={onFormSubmit}>
      <Grid container spacing={2} direction="column" justify="center">
        <Grid item>
          <TextField
            required
            variant="outlined"
            fullWidth
            label="Job Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item>
          <FormLabel>Company</FormLabel>
          <Select
            label="Company"
            disabled={loadingCompanies}
            options={companyOptions}
            value={companyOptions.find(({ value }) => companyID === value)}
            onChange={({ value }) => setCompanyID(value)}
          />
        </Grid>

        <Grid item>
          <FormLabel>Categories</FormLabel>
          <Select
            disabled={loadingCategories}
            isMulti
            options={categoryOptions}
            value={selectedCategories.map(cat =>
              categoryOptions.find(opt => opt.value === cat)
            )}
            onChange={selected =>
              setSelectedCategories(selected.map(({ value }) => value))
            }
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            fullWidth
            required
            multiline
            rows={6}
            label="Job Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item container justify="flex-end">
          <Button
            variant="text"
            onClick={() => replace(backTo)}
            disabled={saving || savingSuccess}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={saving}
            type="submit"
          >
            Submit
          </Button>
        </Grid>
        {saving && <LinearProgress />}
        {savingSuccess && 'Saved!'}
        {savingError && 'Failed to save!'}
      </Grid>
    </FormCardPage>
  );
};

export default AdminJobForm;
