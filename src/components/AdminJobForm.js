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
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { db } from '../firebase';
import { useAdminContainer } from './AdminPageContainer';
import FormCardPage from './FormCardPage';

const wysiwygToolbar = {
  options: ['inline', 'blockType', 'list'],
  inline: {
    options: ['bold', 'italic', 'underline'],
    bold: { className: 'bordered-option-classname' },
    italic: { className: 'bordered-option-classname' },
    underline: { className: 'bordered-option-classname' }
  },
  blockType: {
    className: 'bordered-option-classname'
  }
};

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
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingSuccess, setSavingSuccess] = useState(false);
  const [savingError, setSavingError] = useState(false);
  const [wysiwygState, setWysiwygState] = useState(EditorState.createEmpty());

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
        setFeatured(job.featured || false);
        setLoadingJob(false);
        const contentBlock = htmlToDraft(job.description);
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        setWysiwygState(editorState);
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
        type,
        featured,
        TSUpdated: Date.now()
      };
      let updatePromise;
      let redirect = false;
      if (jobID) {
        updatePromise = doc.current.update(jobData);
      } else {
        jobData.TSCreated = Date.now();
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

  const onWysiwygStateChange = state => {
    setDescription(draftToHtml(convertToRaw(state.getCurrentContent())));
    setWysiwygState(state);
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
          <FormLabel>Description</FormLabel>
          <Editor
            editorState={wysiwygState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            editorStyle={{
              border: 'solid 1px rgba(0, 0, 0, 0.25)',
              borderTop: '0px',
              padding: '0 15px',
              borderRadius: '0 0 4px 4px'
            }}
            toolbarStyle={{
              marginBottom: '0px',
              border: 'solid 1px rgba(0, 0, 0, 0.25)',
              borderRadius: '4px 4px 0 0'
            }}
            toolbar={wysiwygToolbar}
            onEditorStateChange={onWysiwygStateChange}
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
          <FormControlLabel
            control={
              <Checkbox
                checked={featured}
                onChange={e => setFeatured(e.target.checked)}
                value="featured"
              />
            }
            label="Featured"
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
        {savingSuccess && 'Saved!'}
        {savingError && 'Failed to save!'}
      </Grid>
    </FormCardPage>
  );
};

export default AdminJobForm;
