import React, { useState, useEffect, useRef, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

import firebase, { db, storage } from '../firebase';
import GeocodingInput from './GeocodingInput';
import { useAdminContainer } from './AdminPageContainer';
import FormCardPage from './FormCardPage';

export const AdminEditCompanyPage = ({
  match: {
    params: { companyID }
  },
  history
}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({});
  const [inputAddress, setInputAddress] = useState();
  const [slug, setSlug] = useState('');
  const [logo, setLogo] = useState('');
  const [cover, setCover] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [founded, setFounded] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const logoUploadRef = useRef();
  const coverUploadRef = useRef();

  const logoChangeHandler = useCallback(() => {
    const file = logoUploadRef.current.files.item(0);

    if (FileReader && file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const coverChangeHandler = useCallback(() => {
    const file = coverUploadRef.current.files.item(0);

    if (FileReader && file) {
      const reader = new FileReader();
      reader.onload = () => setCover(reader.result);
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

  const doc = useRef(
    db.collection('companies').doc(...(companyID ? [companyID] : []))
  );
  const [loadingCompany, setLoadingCompany] = useState(!!companyID);

  useEffect(() => {
    if (companyID) {
      doc.current.get().then(snapshot => {
        const company = snapshot.data();
        setName(company.name);
        const center = company.coordinates
          ? [company.coordinates.longitude, company.coordinates.latitude]
          : null;
        setAddress({ place_name: company.address, center });
        setInputAddress(company.address || '');
        setSlug(company.slug || '');
        setDescription(company.description || '');
        setUrl(company.url || '');
        setFounded(company.founded || '');
        setLogo(company.logoImg || '');
        setCover(company.coverImg || '');

        setLoadingCompany(false);
      });
    }
  }, [companyID]);

  useAdminContainer({
    loading: loading || loadingCompany,
    backTo: '/admin/companies'
  });

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const imgUploads = [];
    if (coverUploadRef.current.files[0]) {
      const coverRes = storage
        .ref(`companyCovers/${doc.current.id}`)
        .put(coverUploadRef.current.files[0]);
      imgUploads.push(coverRes);
    } else {
      imgUploads.push(undefined);
    }
    if (logoUploadRef.current.files[0]) {
      const logoRes = storage
        .ref(`companyLogos/${doc.current.id}`)
        .put(logoUploadRef.current.files[0]);
      imgUploads.push(logoRes);
    } else {
      imgUploads.push(undefined);
    }
    Promise.all(imgUploads)
      .then(res =>
        Promise.all(
          res.map(({ ref } = {}) => (ref ? ref.getDownloadURL() : null))
        )
      )
      .then(([coverImg, logoImg]) => {
        const companyData = {
          name,
          slug,
          address: address.place_name || null,
          coordinates: address.center
            ? new firebase.firestore.GeoPoint(...address.center.reverse())
            : null,
          coverImg: coverImg || cover,
          logoImg: logoImg || logo,
          url,
          founded,
          description
        };
        if (companyID) {
          return doc.current.update(companyData);
        } else {
          return db.collection('companies').add(companyData);
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
          {cover && (
            <img
              alt={`${name} cover`}
              style={{ height: 'auto', width: 'auto', maxWidth: 300 }}
              src={cover}
            />
          )}
        </Grid>
        <Grid item>
          <FormLabel>Logo</FormLabel>
          <input type="file" ref={logoUploadRef} />
          {logo && (
            <img
              alt={`${name} logo to upload`}
              style={{ height: 'auto', width: 'auto', maxWidth: 300 }}
              src={logo}
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
