import React, { useState, useEffect, useRef, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import firebase, { db, storage } from '../../../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import GeocodingInput from './GeocodingInput';
import { useAdminContainer } from '../UI/PageContainer';
import FormCardPage from '../UI/FormCardPage';
import Select from 'react-select';
import { Photos } from './Photos';
import { makeStyles } from '@material-ui/core/styles';

const EditPageWrapper = ({
  match: {
    params: { companyID }
  },
  history
}) => {
  const [doc, setDoc] = useState(
    db.collection('companies').doc(...(companyID ? [companyID] : []))
  );
  const [loading, setLoading] = useState(true);

  if (companyID) {
    db.collection('companyDrafts')
      .doc(companyID)
      .get()
      .then(snapshot => {
        setLoading(false);
        if (snapshot.exists && snapshot.data().TSCreated) {
          setDoc(db.collection('companyDrafts').doc(companyID));
        }
      });
  }

  if (loading) return <h1>Loading...</h1>;

  return <EditPage doc={doc} history={history} />;
};

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none'
  }
}));

export const EditPage = ({ doc, history }) => {
  const classes = useStyles();

  const [industries = [], loadingIndustries] = useCollectionData(
    db.collection('companyCategories'),
    { idField: 'id' }
  );

  const [companyData, loadingCompany] = useDocumentData(doc);
  const company = companyData || {};
  const [name, setName] = useState('');
  const [address, setAddress] = useState({});
  const [fbLogoURL, fbLogoLoading] = useDownloadURL(
    company.logoPath ? storage.ref(company.logoPath) : null
  );
  const [fbCoverURL, fbCoverLoading] = useDownloadURL(
    company.coverPath ? storage.ref(company.coverPath) : null
  );
  const [fbListingURL, fbListingLoading] = useDownloadURL(
    company.coverPath
      ? storage.ref(company.coverPath.replace('Covers', 'Listings'))
      : null
  );
  const [logoURL, setLogoURL] = useState('');
  const [coverURL, setCoverURL] = useState('');
  const [listingURL, setListingURL] = useState('');
  const [photoURLs, setPhotoURLs] = useState([]);
  const [inputAddress, setInputAddress] = useState('');
  const [slug, setSlug] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [industryID, setIndustryID] = useState('');
  const [url, setUrl] = useState(company.url || '');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [founded, setFounded] = useState('');
  const [instagram, setInstagram] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [featured, setFeatured] = useState(false);
  const [isSponsor, setIsSponsor] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photosToRemove, setPhotosToRemove] = useState([]);
  const logoUploadRef = useRef();
  const coverUploadRef = useRef();
  const listingUploadRef = useRef();
  const photosUploadRef = useRef();

  const [isDraft, setDraft] = useState(false);

  useEffect(() => {
    setName(company.name || '');
    const center = company.coordinates
      ? [company.coordinates.longitude, company.coordinates.latitude]
      : null;
    setAddress({
      center,
      place_name: company.address
    });
    setInputAddress(company.address || '');
    setSlug(company.slug || '');
    setSelectedCategories(company.categories || []);
    setUrl(company.url || '');
    setDescription(company.description || '');
    setShortDescription(company.shortDescription || '');
    setFounded(company.founded || '');
    setInstagram(company.instagram || '');
    setEmployeeCount(company.employeeCount || '');
    setFeatured(company.featured || false);
    setIndustryID(company.industryID || '');
    setIsSponsor(company.isSponsor || '');
    setPhotoURLs(company.photos || []);
  }, [
    company.name,
    company.coordinates,
    company.address,
    company.slug,
    company.url,
    company.description,
    company.shortDescription,
    company.founded,
    company.instagram,
    company.employeeCount,
    company.featured,
    company.industryID,
    company.isSponsor
  ]);

  useEffect(() => {
    setLogoURL(fbLogoURL || '');
  }, [fbLogoURL]);

  useEffect(() => {
    setCoverURL(fbCoverURL || '');
  }, [fbCoverURL]);

  useEffect(() => {
    setListingURL(fbListingURL || '');
  }, [fbListingURL]);

  const logoChangeHandler = useCallback(() => {
    const file = logoUploadRef.current.files.item(0);

    if (FileReader && file) {
      const reader = new FileReader();
      reader.onload = () => setLogoURL(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const coverChangeHandler = useCallback(() => {
    const file = coverUploadRef.current.files.item(0);

    if (FileReader && file) {
      const reader = new FileReader();
      reader.onload = () => setCoverURL(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const listingChangeHandler = useCallback(() => {
    const file = listingUploadRef.current.files.item(0);

    if (FileReader && file) {
      const reader = new FileReader();
      reader.onload = () => setListingURL(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const photosChangeHandler = useCallback(() => {
    const files = photosUploadRef.current.files;
    setPhotoURLs([]);

    if (FileReader && files) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = () =>
          setPhotoURLs(prevURLs => [...prevURLs, reader.result]);
        reader.readAsDataURL(file);
      }
    }
  }, []);

  useEffect(() => {
    if (logoUploadRef.current) {
      const ref = logoUploadRef.current;
      ref.addEventListener('change', logoChangeHandler);
      return () => ref.removeEventListener('change', logoChangeHandler);
    }
  }, [logoChangeHandler]);

  useEffect(() => {
    if (coverUploadRef.current) {
      const ref = coverUploadRef.current;
      ref.addEventListener('change', coverChangeHandler);
      return () => ref.removeEventListener('change', coverChangeHandler);
    }
  }, [coverChangeHandler]);

  useEffect(() => {
    if (listingUploadRef.current) {
      const ref = listingUploadRef.current;
      ref.addEventListener('change', listingChangeHandler);
      return () => ref.removeEventListener('change', listingChangeHandler);
    }
  }, [listingChangeHandler]);

  useEffect(() => {
    if (photosUploadRef.current) {
      const ref = photosUploadRef.current;
      ref.addEventListener('change', photosChangeHandler);
      return () => ref.removeEventListener('change', logoChangeHandler);
    }
  }, [photosChangeHandler]);

  useAdminContainer({
    loading:
      loading ||
      loadingCompany ||
      fbLogoLoading ||
      fbCoverLoading ||
      fbListingLoading,
    backTo: '/admin/companies'
  });

  const industryOptions = industries.map(({ id, name }) => ({
    value: id,
    label: name
  }));

  const sizeOptions = ['<10', '10-50', '50-100', '100-500', '500+'].map(
    opt => ({ label: opt, value: opt })
  );

  const removePhoto = (url, index) => {
    photosUploadRef.current.value = '';
    setPhotoURLs(prevState => prevState.filter((_, i) => i !== index));
    setPhotosToRemove(prevState => {
      if (!prevState.includes(url)) {
        return [...prevState, url];
      } else {
        return prevState;
      }
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const companyData = {
      name,
      slug,
      categories: selectedCategories,
      address: address.place_name || null,
      coordinates: address.center
        ? new firebase.firestore.GeoPoint(...address.center.reverse())
        : null,
      url,
      founded,
      instagram,
      employeeCount,
      description,
      shortDescription,
      industryID,
      featured,
      isSponsor,
      TSUpdated: Date.now(),
      TSCreated: company.TSCreated ? company.TSCreated : Date.now(),
      coverPath: company.coverPath,
      logoPath: company.logoPath,
      listingPath: company.listingPath ? company.listingPath : company.coverPath
    };

    let newDoc;
    if (isDraft) {
      newDoc = db.collection('companyDrafts').doc(doc.id);
    } else {
      // If a doc is being published, delete its temporary draft
      db.collection('companyDrafts')
        .doc(doc.id)
        .delete()
        .then(() => {
          console.log('Deleted Draft');
        });

      newDoc = db.collection('companies').doc(doc.id);
    }
    // after we create or update the doc, we'll have the ID which we need for
    // the images
    newDoc
      .set(companyData, { merge: true })
      // 1: Upload new images to Firebase storage
      .then(() => {
        const imgUploads = [];

        if (coverUploadRef.current.files[0]) {
          const coverRes = storage
            .ref(`companyCovers/${doc.id}`)
            .put(coverUploadRef.current.files[0]);
          imgUploads.push(coverRes);
        } else {
          imgUploads.push(null);
        }

        if (listingUploadRef.current.files[0]) {
          const listingRes = storage
            .ref(`companyListings/${doc.id}`)
            .put(listingUploadRef.current.files[0]);
          imgUploads.push(listingRes);
        } else {
          imgUploads.push(null);
        }

        if (logoUploadRef.current.files[0]) {
          const logoRes = storage
            .ref(`companyLogos/${doc.id}`)
            .put(logoUploadRef.current.files[0]);
          imgUploads.push(logoRes);
        } else {
          imgUploads.push(null);
        }

        if (
          photosUploadRef.current &&
          photosUploadRef.current.files.length > 0
        ) {
          for (let file of photosUploadRef.current.files) {
            const fileRes = storage
              .ref(`companyPhotos/${doc.id}/${file.name}`)
              .put(file);
            imgUploads.push(fileRes);
          }
        }

        return Promise.all(imgUploads);
      })
      // 2: Fetch storage URL's for linking photos in database
      .then(([newCover, newListing, newLogo, ...newPhotos]) => {
        if (newPhotos) {
          return Promise.all([
            Promise.resolve(newCover),
            Promise.resolve(newListing),
            Promise.resolve(newLogo),
            Promise.all(
              newPhotos.map(photo => {
                return photo.ref.getDownloadURL();
              })
            )
          ]);
        }
        return Promise.resolve([newCover, newLogo]);
      })
      // 3: Update doc with all new additions
      .then(([newCover, newListing, newLogo, photoUrls]) => {
        // only set the fields we changed so we don't overwrite someone
        // else
        const update = {};

        if (newCover) {
          update.coverPath = newCover.ref.fullPath;
        }

        if (newListing) {
          update.listingPath = newListing.ref.fullPath;
        }

        if (newLogo) {
          update.logoPath = newLogo.ref.fullPath;
        }

        if (photoUrls && photoUrls.length > 0) {
          update.photos = firebase.firestore.FieldValue.arrayUnion(
            ...photoUrls
          );
        }

        return doc.set(update, { merge: true });
      })
      // 4: Update doc with new deletions (this cannot be done in a single step)
      .then(() => {
        if (photosToRemove.length > 0) {
          return doc.update({
            photos: firebase.firestore.FieldValue.arrayRemove(...photosToRemove)
          });
        }
        return Promise.resolve();
      })
      // 5: Update loading state
      .then(() => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          history.goBack();
        }, 800);
      });
  };

  const saveAsDraft = () => {
    setDraft(true);
  };

  return (
    <FormCardPage title="Company Details" onSubmit={onSubmit}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <FormLabel>Cover</FormLabel>
          <input type="file" ref={coverUploadRef} />
          {coverURL && (
            <img
              alt={`${name} cover`}
              style={{ height: 'auto', width: 'auto', maxWidth: 300 }}
              src={coverURL}
            />
          )}
        </Grid>
        <Grid item>
          <FormLabel>Listing</FormLabel>
          <input type="file" ref={listingUploadRef} />
          {listingURL && (
            <img
              alt={`${name} listing photo`}
              style={{ height: 'auto', width: 'auto', maxWidth: 300 }}
              src={listingURL}
            />
          )}
        </Grid>
        <Grid item>
          <FormLabel>Logo</FormLabel>
          <input type="file" ref={logoUploadRef} />
          {logoURL && (
            <img
              alt={`${name} logo to upload`}
              style={{ height: 'auto', width: 'auto', maxWidth: 300 }}
              src={logoURL}
            />
          )}
        </Grid>

        <Grid item>
          <TextField
            value={name}
            label="Company Name"
            variant="outlined"
            onChange={e => setName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            value={slug}
            fullWidth
            variant="outlined"
            label="Slug for readable URLs"
            onChange={e => setSlug(e.target.value)}
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
          <FormControlLabel
            control={
              <Checkbox
                checked={isSponsor}
                onChange={e => setIsSponsor(e.target.checked)}
                value="isSponsor"
              />
            }
            label="Sponsor"
          />
        </Grid>
        <Grid item>
          <FormLabel>Industry</FormLabel>
          <Select
            label="Industry"
            disabled={loadingIndustries}
            options={industryOptions}
            value={industryOptions.find(({ value }) => industryID === value)}
            onChange={({ value }) => setIndustryID(value)}
          />
        </Grid>
        <Grid item>
          <TextField
            value={description}
            fullWidth
            variant="outlined"
            label="Description"
            onChange={e => setDescription(e.target.value)}
            multiline
          />
        </Grid>
        <Grid item>
          <TextField
            value={shortDescription}
            fullWidth
            variant="outlined"
            label="Short Description"
            onChange={e => setShortDescription(e.target.value)}
            multiline
          />
        </Grid>
        <Grid item>
          <FormLabel>Address</FormLabel>
          <GeocodingInput
            placeholder="Address"
            isClearable
            hideSelectedOptions={false}
            inputValue={inputAddress}
            onInputChange={(val, { action, ...other }) => {
              if (action !== 'input-blur' && action !== 'menu-close') {
                setInputAddress(val);
              }
            }}
            defaultOptions={[address]}
            onChange={(val, { action }) => {
              if (action === 'select-option') {
                setAddress(val);
              }
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            value={url}
            fullWidth
            variant="outlined"
            label="URL"
            onChange={e => setUrl(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            value={founded}
            fullWidth
            variant="outlined"
            label="Year Founded"
            onChange={e => setFounded(e.target.value)}
          />
        </Grid>
        <Grid item>
          <FormLabel>Employee Count</FormLabel>
          <Select
            label="Employee Count"
            options={sizeOptions}
            value={sizeOptions.find(({ value }) => employeeCount === value)}
            onChange={({ value }) => setEmployeeCount(value)}
          />
        </Grid>
        <Grid item>
          <TextField
            value={instagram}
            fullWidth
            variant="outlined"
            label="Instagram Username"
            onChange={e => setInstagram(e.target.value)}
          />
        </Grid>

        <Grid item container justify="center">
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: 'none' }}
            id="contained-button-file"
            multiple
            type="file"
            ref={photosUploadRef}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload Photos
            </Button>
          </label>
        </Grid>
        <Grid item container justify="flex-end">
          {photoURLs.length > 0 && (
            <Photos photoURLs={photoURLs || []} onDelete={removePhoto} />
          )}
        </Grid>
        <Grid item container justify="flex-end">
          <Button
            disabled={success || loading}
            variant="text"
            onClick={history.goBack}
          >
            Cancel
          </Button>
          <Button
            disabled={success || loading}
            variant="text"
            type="submit"
            onClick={saveAsDraft}
          >
            {success ? 'Saved' : doc.id ? 'Save As Draft' : 'Create As Draft'}
          </Button>
          <Button
            disabled={success || loading}
            variant="contained"
            color="primary"
            type="submit"
          >
            {success ? 'Published' : doc.id ? 'Publish' : 'Create'}
          </Button>
        </Grid>
      </Grid>
    </FormCardPage>
  );
};

export default EditPageWrapper;
