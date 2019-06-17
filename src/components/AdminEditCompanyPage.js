import React, { useState, useEffect, useRef, useCallback } from 'react';
import AdminPageContainer from './AdminPageContainer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';

import firebase, { db, storage } from '../firebase';
import GeocodingInput from './GeocodingInput';

const useStyles = makeStyles(theme => ({
  form: {
    width: 300,
    display: 'flex',
    flexDirection: 'column'
  }
}));

export const AdminEditCompanyPage = ({
  match: {
    params: { companyID }
  }
}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({});
  const [inputAddress, setInputAddress] = useState();
  const [slug, setSlug] = useState('');
  const [logo, setLogo] = useState('');
  const [cover, setCover] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const logoUploadRef = useRef();
  const coverUploadRef = useRef();
  const classes = useStyles();

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
      logoUploadRef.current.addEventListener('change', logoChangeHandler);
      return () =>
        logoUploadRef.current.removeEventListener('change', logoChangeHandler);
    }
  }, []);

  useEffect(() => {
    if (coverUploadRef.current) {
      coverUploadRef.current.addEventListener('change', coverChangeHandler);
      return () =>
        coverUploadRef.current.removeEventListener(
          'change',
          coverChangeHandler
        );
    }
  }, []);

  const doc = useRef(
    db.collection('companies').doc(...(companyID ? [companyID] : []))
  );
  const [loadingCompany, setLoadingCompany] = useState(!!companyID);
  useEffect(() => {
    if (companyID) {
      doc.current.get().then(snapshot => {
        const company = snapshot.data();
        setName(company.name);
        const center = [
          company.coordinates.latitude,
          company.coordinates.longitude
        ];
        setAddress({ place_name: company.address, center });
        setInputAddress(company.address);
        setSlug(company.slug);

        setLoadingCompany(false);
      });
    }
  }, [companyID]);

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    doc.current
      .set({
        name,
        slug,
        address: address.place_name,
        coordinates: new firebase.firestore.GeoPoint(
          ...address.center.reverse()
        )
      })
      .then(() => {
        const results = [];
        if (coverUploadRef.current.files[0]) {
          const coverRes = storage
            .ref(`companyCovers/${doc.current.id}`)
            .put(coverUploadRef.current.files[0]);
          results.push(coverRes);
        }
        if (logoUploadRef.current.files[0]) {
          const logoRes = storage
            .ref(`companyLogos/${doc.current.id}`)
            .put(logoUploadRef.current.files[0]);
          results.push(logoRes);
        }
        return results;
      })
      .then(() => {
        setSuccess(true);
        setLoading(false);
      });
  };

  return (
    <AdminPageContainer backTo="/admin/companies">
      <form onSubmit={onSubmit} className={classes.form}>
        <label>
          Cover
          <input type="file" ref={coverUploadRef} />
        </label>
        {cover && (
          <img
            style={{ height: 'auto', width: 'auto', maxWidth: 300 }}
            src={cover}
          />
        )}
        <label>
          Logo
          <input type="file" ref={logoUploadRef} />
        </label>
        {logo && (
          <img
            style={{ height: 'auto', width: 'auto', maxWidth: 300 }}
            src={logo}
          />
        )}

        <TextField
          value={name}
          label="Company Name"
          onChange={e => setName(e.target.value)}
        />
        <TextField
          value={slug}
          label="Slug for readable URLs"
          onChange={e => setSlug(e.target.value)}
        />
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
        <Button type="submit">{companyID ? 'Save' : 'Create'}</Button>
        {loading && <LinearProgress />}
        {success && 'Success!'}
      </form>
    </AdminPageContainer>
  );
};

export default AdminEditCompanyPage;
