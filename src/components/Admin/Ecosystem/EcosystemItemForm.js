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
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { db } from '../../../firebase';
import { useAdminContainer } from '../../AdminPageContainer';
import FormCardPage from '../../FormCardPage';

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

export const EcosysteItemForm = ({
  match: {
    params: { ecoID }
  },
  history: { replace = () => {}, push = () => {} }
}) => {
  const [categories = [], loadingCategories] = useCollectionData(
    db.collection('ecosystemCategories').orderBy('name', 'asc'),
    { idField: 'id' }
  );

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [link, setLink] = useState('');
  const [saving, setSaving] = useState(false);
  const [savingSuccess, setSavingSuccess] = useState(false);
  const [savingError, setSavingError] = useState(false);
  const [wysiwygState, setWysiwygState] = useState(EditorState.createEmpty());

  const doc = useRef(db.collection('ecosystem').doc(...(ecoID ? [ecoID] : [])));
  const [loadingEcoItem, setLoadingEcoItem] = useState(!!ecoID);
  useEffect(() => {
    if (ecoID) {
      doc.current.get().then(snapshot => {
        const ecoItem = snapshot.data();
        console.warn(ecoItem);
        setName(ecoItem.name || '');
        setDescription(ecoItem.description || '');
        setSelectedCategories(ecoItem.categories || []);
        setFeatured(ecoItem.featured || false);
        setLink(ecoItem.link || '');
        setLoadingEcoItem(false);
        const contentBlock = htmlToDraft(ecoItem.description);
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        setWysiwygState(editorState);
      });
    }
  }, [ecoID]);

  const backTo = ecoID ? `/admin/ecosystem/${ecoID}` : '/admin/ecosystem';
  useAdminContainer({
    backTo,
    loading: loadingCategories || loadingEcoItem
  });

  const onFormSubmit = e => {
    e.preventDefault();

    if (name && selectedCategories.length) {
      setSaving(true);
      setSavingError(false);
      setSavingSuccess(false);
      const ecoItemData = {
        name,
        description,
        categories: selectedCategories,
        featured,
        link,
        TSUpdated: Date.now()
      };
      let updatePromise;
      let redirect = false;
      if (ecoID) {
        updatePromise = doc.current.update(ecoItemData);
      } else {
        ecoItemData.TSCreated = Date.now();
        updatePromise = db.collection('ecosystem').add(ecoItemData);
        redirect = true;
      }

      updatePromise.then(ecoItemRef => {
        setSaving(false);
        setSavingSuccess(true);
        setSavingError(false);
        if (redirect) {
          setTimeout(() => push('/admin/ecosystem/' + ecoItemRef.id), 1000);
        }
      });
    }
  };

  const onCategoryChange = (event, cats) => {
    setSelectedCategories(cats.map(cat => cat.id));
  };

  const onWysiwygStateChange = state => {
    setDescription(draftToHtml(convertToRaw(state.getCurrentContent())));
    setWysiwygState(state);
  };

  return (
    <FormCardPage title="Ecosystem Item Details" onSubmit={onFormSubmit}>
      <Grid container spacing={2} direction="column" justify="center">
        <Grid item>
          <TextField
            required
            variant="outlined"
            fullWidth
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
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
          <TextField
            variant="outlined"
            fullWidth
            label="Link"
            value={link}
            onChange={e => setLink(e.target.value)}
          />
        </Grid>
        <Grid item>
          {!loadingEcoItem && (
            <Autocomplete
              multiple
              options={categories}
              getOptionLabel={option => option.name}
              filterSelectedOptions
              defaultValue={categories.filter(cat =>
                selectedCategories.includes(cat.id)
              )}
              onChange={onCategoryChange}
              renderInput={params => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  label="Categories"
                  placeholder="Add Categories..."
                />
              )}
            />
          )}
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

export default EcosysteItemForm;
