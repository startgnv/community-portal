import React, { useState, useRef, useEffect } from 'react';
import { db, storage } from 'src/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';

import { useAdminContainer } from 'src/components/Admin/UI/PageContainer';
import FormCardPage from 'src/components/Admin/UI/FormCardPage';
import { Switch } from '@material-ui/core';
import ThumbnailUpload from 'src/components/Admin/Ecosystem/ThumbnailUpload';
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

export const EcosystemItemForm = ({ ecoID }) => {
  const router = useRouter();
  const replace = path => router.push(path, undefined, { shallow: true });
  const push = path => router.push(path);

  const [categories = [], loadingCategories] = useCollectionData(
    db.collection('ecosystemCategories').orderBy('name', 'asc'),
    { idField: 'id' }
  );

  const [name, setName] = useState('');
  const [isEvent, setIsEvent] = useState(false);
  const [eventDate, setEventDate] = useState(new Date(Date.now()));
  const [location, setLocation] = useState('');
  const [thumbnail, setThumbnail] = useState({ isString: true, value: '' });
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
        setName(ecoItem.name || '');
        setIsEvent(ecoItem.isEvent || false);
        if (isEvent) setEventDate(ecoItem.eventDate);
        setLocation(ecoItem.location || '');
        setThumbnail(
          ecoItem.thumbnail
            ? { isString: true, value: ecoItem.thumbnail }
            : { isString: true, value: '' }
        );
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
      let ecoItemData = {
        name,
        isEvent,
        location,
        description,
        categories: selectedCategories,
        featured,
        link,
        TSUpdated: Date.now()
      };

      if (isEvent) {
        ecoItemData.eventDate = eventDate.getTime();
      }

      let uploadThumbnail = Promise.resolve();
      if (!thumbnail.isString) {
        uploadThumbnail = storage
          .ref(`ecosystemThumbnails/${ecoID}`)
          .put(thumbnail.value);
      }

      // Upload thumbnail image to storage if necessary
      uploadThumbnail
        // Fetch the absolute URL for the image
        .then(thumbnailFile => {
          if (thumbnailFile) {
            return thumbnailFile.ref.getDownloadURL();
          }

          return Promise.resolve();
        })
        // Add the thumbnail URL and update the db
        .then(thumbnailUrl => {
          if (thumbnailUrl) {
            ecoItemData.thumbnail = thumbnailUrl;
          }

          let updatePromise;
          let redirect = false;
          if (ecoID) {
            updatePromise = doc.current.update(ecoItemData);
          } else {
            ecoItemData.TSCreated = Date.now();
            updatePromise = db.collection('ecosystem').add(ecoItemData);
            redirect = true;
          }

          return Promise.all([updatePromise, Promise.resolve(redirect)]);
        })
        // Update UI state
        .then(([ecoItemRef, redirect]) => {
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

  const updateThumbnail = thumbnailBlob =>
    setThumbnail({ isString: false, value: thumbnailBlob });

  return (
    <FormCardPage title="Ecosystem Item Details" onSubmit={onFormSubmit}>
      <Grid container spacing={2} direction="column" justifyContent="center">
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
          <FormControlLabel
            control={
              <Switch
                checked={isEvent}
                onChange={e => setIsEvent(e.target.checked)}
              />
            }
            label="Set Date and Time (for events)"
          />
        </Grid>

        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                disabled={!isEvent}
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Event Date"
                value={eventDate}
                onChange={setEventDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
              <KeyboardTimePicker
                disabled={!isEvent}
                margin="normal"
                id="time-picker"
                label="Event Time"
                value={eventDate}
                onChange={setEventDate}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item>
          <TextField
            variant="outlined"
            fullWidth
            label="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </Grid>

        <Grid item>
          <ThumbnailUpload
            onChange={updateThumbnail}
            defaultValue={thumbnail.value}
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
        <Grid item container justifyContent="flex-end">
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

export default EcosystemItemForm;
