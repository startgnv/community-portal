import _ from 'lodash';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

import firebase, { db, storage } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import GeocodingInput from './GeocodingInput';
import { useAdminContainer } from './AdminPageContainer';
import FormCardPage from './FormCardPage';
import Select from 'react-select';

export const AdminEditCompanyPage = ({
  match: {
    params: { companyID }
  },
  history
}) => {
  const [industries = [], loadingIndustries] = useCollectionData(
    db.collection('companyCategories'),
    { idField: 'id' }
  );
  const doc = useRef(
    // we do the spread trick to "trick" firebase into giving us a doc with a
    // random ID but it only does that if you pass _nothing_ to it
    db.collection('companies').doc(...(companyID ? [companyID] : []))
  );
  const [companyData, loadingCompany] = useDocumentData(doc.current);
  const company = companyData || {};
  const [name, setName] = useState('');
  const [address, setAddress] = useState({});
  const [fbLogoURL, fbLogoLoading] = useDownloadURL(
    company.logoPath ? storage.ref(company.logoPath) : null
  );
  const [fbCoverURL, fbCoverLoading] = useDownloadURL(
    company.coverPath ? storage.ref(company.coverPath) : null
  );
  const [logoURL, setLogoURL] = useState('');
  const [coverURL, setCoverURL] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [slug, setSlug] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [industryID, setIndustryID] = useState('');
  const [url, setUrl] = useState(company.url || '');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [founded, setFounded] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const logoUploadRef = useRef();
  const coverUploadRef = useRef();

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
    setEmployeeCount(company.employeeCount || '');
    setIndustryID(company.industryID || '');
  }, [
    company.name,
    company.coordinates,
    company.address,
    company.slug,
    company.url,
    company.description,
    company.shortDescription,
    company.founded,
    company.employeeCount,
    company.industryID
  ]);

  useEffect(() => {
    setLogoURL(fbLogoURL || '');
  }, [fbLogoURL]);

  useEffect(() => {
    setCoverURL(fbCoverURL || '');
  }, [fbCoverURL]);

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

  useAdminContainer({
    loading: loading || loadingCompany || fbLogoLoading || fbCoverLoading,
    backTo: '/admin/companies'
  });

  const industryOptions = industries.map(({ id, name }) => ({
    value: id,
    label: name
  }));

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
      employeeCount,
      description,
      shortDescription,
      industryID
    };
    // after we create or update the doc, we'll have the ID which we need for
    // the images
    doc.current
      .set(companyData, { merge: true })
      .then(() => {
        const imgUploads = [];
        if (coverUploadRef.current.files[0]) {
          const coverRes = storage
            .ref(`companyCovers/${doc.current.id}`)
            .put(coverUploadRef.current.files[0]);
          imgUploads.push(coverRes);
        } else {
          imgUploads.push(null);
        }
        if (logoUploadRef.current.files[0]) {
          const logoRes = storage
            .ref(`companyLogos/${doc.current.id}`)
            .put(logoUploadRef.current.files[0]);
          imgUploads.push(logoRes);
        } else {
          imgUploads.push(null);
        }
        return Promise.all(imgUploads);
      })
      .then(([newCover, newLogo]) => {
        if (newCover || newLogo) {
          const update = {};
          // only set the fields we changed so we don't overwrite someone
          // else
          if (newCover) {
            update.coverPath = newCover.ref.fullPath;
          }
          if (newLogo) {
            update.logoPath = newLogo.ref.fullPath;
          }
          return doc.current.update(update);
        }
      })
      .then(() => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          history.goBack();
        }, 800);
      });
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
          <TextField
            value={employeeCount}
            fullWidth
            variant="outlined"
            label="Employee Count"
            onChange={e => setEmployeeCount(e.target.value)}
          />
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
            variant="contained"
            color="primary"
            type="submit"
          >
            {success ? 'Saved' : companyID ? 'Save' : 'Create'}
          </Button>
        </Grid>
      </Grid>
    </FormCardPage>
  );
};

export default AdminEditCompanyPage;
