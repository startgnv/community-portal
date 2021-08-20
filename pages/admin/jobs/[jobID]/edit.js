import React, { useState, useRef, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';
import Select from 'react-select';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Tree } from 'antd';
import 'antd/lib/tree/style/index.css';
import { db } from 'src/firebase';
import { useAdminContainer } from 'src/components/Admin/UI/PageContainer';
import FormCardPage from 'src/components/Admin/UI/FormCardPage';
import { useRouter } from 'next/router';

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

const EditPageWrapper = () => {

  const router = useRouter();
  const { jobID } = router.query;

  const [draftJob, setDraftJob] = useState(null);
  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [wasDraft, setWasDraft] = useState(false);
  const [isUnpublished, setIsUnpublished] = useState(false);

  const [categories = [], loadingCategories] = useCollectionData(
    db.collection('jobCategories').orderBy('name', 'asc'),
    { idField: 'id' }
  );

  const [companies = [], loadingCompanies] = useCollectionData(
    db.collection('companies').orderBy('name', 'asc'),
    { idField: 'id' }
  );

  useEffect(() => {
    if (jobID) {
      db.collection(
        process.env.REACT_APP_ENVIRONMENT === 'test'
          ? 'draftJobsTest'
          : 'draftJobs'
      )
        .doc(jobID)
        .get()
        .then(snapshot => {
          if (snapshot.exists && snapshot.data().title) {
            setDraftJob({ id: snapshot.id, ...snapshot.data() });
            setWasDraft(true);
          }

          return db
            .collection(
              process.env.REACT_APP_ENVIRONMENT === 'test' ? 'jobsTest' : 'jobs'
            )
            .doc(jobID)
            .get();
        })
        .then(snapshot => {
          if (snapshot.exists && snapshot.data().title) {
            setJob({ id: snapshot.id, ...snapshot.data() });
          } else {
            // Set a job as unpublished if there is a draft but no associated
            // published version
            setIsUnpublished(true);
          }
          setLoadingJob(false);
        })
        .catch(() => {
          setLoadingJob(false);
        });
    } else {
      setLoadingJob(false);
      setWasDraft(false);
      setIsUnpublished(true);
    }
  }, [jobID]);

  if (loadingJob || loadingCompanies || loadingCategories)
    return <h1>Loading...</h1>;

  return (
    <EditPage
      job={draftJob ? draftJob : job ? job : {}}
      wasDraft={wasDraft}
      setWasDraft={setWasDraft}
      isUnpublished={isUnpublished}
      setIsUnpublished={setIsUnpublished}
      companies={companies}
      categories={categories}
      history={history}
      loading={loadingJob || loadingCompanies || loadingCategories}
    />
  );
};

export const EditPage = ({
  job,
  companies,
  categories,
  history: { replace = () => {}, push = () => {} },
  loading,
  wasDraft,
  setWasDraft,
  isUnpublished,
  setIsUnpublished
}) => {
  // Draft state
  const [isDraft, setDraft] = useState(false);

  // Job form state
  const [title, setTitle] = useState(job.title || '');
  const [companyContactEmail, setCompanyContactEmail] = useState(
    job.companyContactEmail || ''
  );
  const [description, setDescription] = useState(job.description || '');
  const [wysiwygState, setWysiwygState] = useState(EditorState.createEmpty());
  const [companyID, setCompanyID] = useState(job.companyID || null);
  const [selectedCategories, setSelectedCategories] = useState(
    job.categories || []
  );
  const [applyUrl, setApplyUrl] = useState(job.applyUrl || '');
  const [type, setType] = useState(job.type || 'fullTime');
  const [featured, setFeatured] = useState(!!job.featured);

  // Editor state
  const [saving, setSaving] = useState(false);
  const [savingSuccess, setSavingSuccess] = useState(false);
  const [savingError, setSavingError] = useState('');

  // Tree view state
  const [expandedKeys, setExpandedKeys] = React.useState([]);
  const [selectedKeys, setSelectedKeys] = React.useState([]);
  const [autoExpandParent, setAutoExpandParent] = React.useState(true);
  const tree = categories.reduce(categoryToNode, []);

  useEffect(() => {
    if (job && job.description) {
      const contentBlock = htmlToDraft(job.description);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setWysiwygState(editorState);
    }
  }, [job]);

  const backTo = job && job.id ? `/admin/jobs/${job.id}` : '/admin/jobs';
  useAdminContainer({
    backTo,
    loading
  });

  const onFormSubmit = e => {
    e.preventDefault();

    if (!title) {
      setSaving(false);
      setSavingError('Could not save, a job must have a title');
      return;
    }

    if (title) {
      setSaving(true);
      setSavingError('');
      setSavingSuccess(false);
      const jobData = {
        title,
        companyContactEmail,
        description,
        categories: selectedCategories,
        companyID,
        applyUrl,
        type,
        featured,
        TSUpdated: Date.now()
      };
      let updatePromise = Promise.resolve();
      let clearDraft = Promise.resolve();

      if (!jobData.TSCreated) jobData.TSCreated = Date.now();

      if (isDraft) {
        if (wasDraft) {
          updatePromise = db
            .collection(
              process.env.REACT_APP_ENVIRONMENT === 'test'
                ? 'draftJobsTest'
                : 'draftJobs'
            )
            .doc(job.id)
            .update(jobData);
        } else {
          if (isUnpublished) {
            updatePromise = db
              .collection(
                process.env.REACT_APP_ENVIRONMENT === 'test'
                  ? 'draftJobsTest'
                  : 'draftJobs'
              )
              .add(jobData);
          } else {
            updatePromise = db
              .collection(
                process.env.REACT_APP_ENVIRONMENT === 'test'
                  ? 'draftJobsTest'
                  : 'draftJobs'
              )
              .doc(job.id)
              .set(jobData);
          }
        }
      } else {
        if (!description) {
          setSaving(false);
          setSavingError('Could not publish, a job must have a description');
          return;
        }

        if (!selectedCategories.length) {
          setSaving(false);
          setSavingError(
            'Could not not publish, a job must have at least one category'
          );
          return;
        }

        if (!companyID) {
          setSaving(false);
          setSavingError('Could not publish, company is not chosen');
          return;
        }

        if (!applyUrl) {
          setSaving(false);
          setSavingError(
            'Could not not publish, a job must have an application URL'
          );
          return;
        }

        // Job is being published for the first time
        if (isUnpublished) {
          updatePromise = db
            .collection(
              process.env.REACT_APP_ENVIRONMENT === 'test' ? 'jobsTest' : 'jobs'
            )
            .add(jobData);

          setIsUnpublished(false);
        }
        // An already published job is being updated
        else {
          updatePromise = db
            .collection(
              process.env.REACT_APP_ENVIRONMENT === 'test' ? 'jobsTest' : 'jobs'
            )
            .doc(job.id)
            .update(jobData);
        }

        // Delete the now unnecessary drafted version if it exists
        if (wasDraft) {
          clearDraft = db
            .collection(
              process.env.REACT_APP_ENVIRONMENT === 'test'
                ? 'draftJobsTest'
                : 'draftJobs'
            )
            .doc(job.id)
            .delete();

          setWasDraft(false);
        }
      }

      clearDraft
        .then(() => {
          return updatePromise;
        })
        .then(jobRef => {
          setSaving(false);
          setSavingSuccess(true);
          setSavingError('');
          setTimeout(
            () => push('/admin/jobs/' + (jobRef ? jobRef.id : job.id)),
            1000
          );
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

  const onCategoryChange = (event, cats) => {
    setSelectedCategories(cats.map(cat => cat.id));
  };

  const onWysiwygStateChange = state => {
    setDescription(draftToHtml(convertToRaw(state.getCurrentContent())));
    setWysiwygState(state);
  };

  // Used to fold a list of categories into a tree
  function categoryToNode(tree, category) {
    const node = {
      title: category.name,
      key: category.id
    };

    if (category.hasChildren && !category.parentID) {
      node.children = category.childrenById
        .map(childId => {
          // Create a child copy without the parent id, leaf nodes
          // with no parent will attach to their local root
          const { id, hasChildren, childrenById, name } = categories.find(
            cat => cat.id === childId
          );
          return { id, hasChildren, childrenById, name };
        })
        .reduce(categoryToNode, []);

      return [...tree, node];
    }

    // If no parent, add the node to the current level
    if (!category.parentID) {
      return [...tree, node];
    }

    return tree;
  }

  const onExpand = expandedKeys => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onSelect = (selectedKeys, info) => {
    setSelectedKeys(selectedKeys);
  };

  const onCheck = checkedKeys => {
    setSelectedCategories(checkedKeys);
  };

  return (
    <FormCardPage title="Job Details" onSubmit={onFormSubmit}>
      <Grid container spacing={2} direction="column" justify="center">
        <Grid item>
          <TextField
            data-test-id="field-title"
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
            data-test-id="field-contact-email"
            variant="outlined"
            fullWidth
            label="Company Contact Email"
            value={companyContactEmail}
            onChange={e => setCompanyContactEmail(e.target.value)}
          />
        </Grid>
        <Grid item>
          <FormLabel>Description</FormLabel>
          <Editor
            webDriverTestID="field-description"
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
            data-test-id="field-application-url"
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
            data-test-id="field-job-type"
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
            placeholder={job && job.companyName ? job.companyName : 'Select...'}
            disabled={loading}
            options={companyOptions}
            value={companyOptions.find(({ value }) => companyID === value)}
            onChange={({ value }) => setCompanyID(value)}
          />
        </Grid>

        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                data-test-id="field-featured"
                checked={featured}
                onChange={e => setFeatured(e.target.checked)}
                value="featured"
              />
            }
            label="Featured"
          />
        </Grid>

        <Grid item>
          <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={selectedCategories}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={tree}
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
            data-test-id="draft-button"
            disabled={saving || loading}
            variant="text"
            type="submit"
            onClick={() => setDraft(true)}
          >
            Save As Draft
          </Button>
          <Button
            data-test-id="publish-button"
            variant="contained"
            color="primary"
            disabled={saving}
            onClick={() => setDraft(false)}
            type="submit"
          >
            Publish
          </Button>
        </Grid>
        {saving && <LinearProgress />}
        {savingSuccess && 'Saved!'}
        {savingError}
      </Grid>
    </FormCardPage>
  );
};

export default EditPageWrapper;
