import _ from 'lodash';
import React, { useState, useRef, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';
import Select from 'react-select';

import { db } from '../firebase';
import { useAdminContainer } from './AdminPageContainer';
import FormCardPage from './FormCardPage';

export const AdminJobForm = ({
  match: {
    params: { jobID }
  },
  history: { replace = () => {}, push = () => {} }
}) => {
  const [categories = [], loadingCategories] = useCollectionData(
    db.collection('jobCategories').orderBy('name', 'asc'),
    { idField: 'id' }
  );
  const [companies = [], loadingCompanies] = useCollectionData(
    db.collection('companies').orderBy('name', 'asc'),
    { idField: 'id' }
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [companyID, setCompanyID] = useState();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [applyUrl, setApplyUrl] = useState('');
  const [type, setType] = useState('');
  const [saving, setSaving] = useState(false);
  const [savingSuccess, setSavingSuccess] = useState(false);
  const [savingError, setSavingError] = useState(false);

  const doc = useRef(db.collection('jobs').doc(...(jobID ? [jobID] : [])));
  const [loadingJob, setLoadingJob] = useState(!!jobID);
  useEffect(() => {
    if (jobID) {
      doc.current.get().then(snapshot => {
        const job = snapshot.data();
        setTitle(job.title || '');
        setDescription(job.description || '');
        setCompanyID(job.companyID || '');
        setSelectedCategories(job.categories || []);
        setApplyUrl(job.applyUrl || '');
        setType(job.type || 'fullTime');
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

    if (
      title &&
      description &&
      selectedCategories.length &&
      companyID &&
      applyUrl
    ) {
      setSaving(true);
      setSavingError(false);
      setSavingSuccess(false);
      const jobData = {
        title,
        description,
        categories: selectedCategories,
        companyID,
        applyUrl,
        type
      };
      let updatePromise;
      let redirect = false;
      if (jobID) {
        updatePromise = doc.current.update(jobData);
      } else {
        updatePromise = db.collection('jobs').add(jobData);
        redirect = true;
      }

      updatePromise.then(jobRef => {
        setSaving(false);
        setSavingSuccess(true);
        setSavingError(false);
        if (redirect) {
          setTimeout(() => push('/admin/jobs/' + jobRef.id), 1000);
        }
      });
    }
  };

  const companyOptions = companies.map(({ id, name }) => ({
    value: id,
    label: name
  }));

  const typeOptions = [
    {
      value: 'fullTime',
      label: 'Full Time'
    },
    {
      value: 'partTime',
      label: 'Part Time'
    }
  ];

  const onCategoryChange = ({ target: { checked, value } }) => {
    let newCategories;
    if (checked) {
      newCategories = _.concat(selectedCategories, value);
    } else {
      newCategories = _.without(selectedCategories, value);
    }
    setSelectedCategories(newCategories);
  };

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
        <Grid item>
          <TextField
            required
            variant="outlined"
            fullWidth
            label="Application URL"
            value={applyUrl}
            onChange={e => setApplyUrl(e.target.value)}
          />
        </Grid>
        <Grid item>
          <FormLabel>Type</FormLabel>
          <Select
            label="Type"
            options={typeOptions}
            value={typeOptions.find(({ value }) => type === value)}
            onChange={({ value }) => {
              setType(value);
            }}
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
          <FormGroup>
            {categories.map(cat => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCategories.indexOf(cat.id) > -1}
                    onChange={onCategoryChange}
                    value={cat.id}
                  />
                }
                label={cat.name}
                key={cat.id}
              />
            ))}
          </FormGroup>
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
        {savingSuccess && 'Saved! Redirecting...'}
        {savingError && 'Failed to save!'}
      </Grid>
    </FormCardPage>
  );
};

export default AdminJobForm;
