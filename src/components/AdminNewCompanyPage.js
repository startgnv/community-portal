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

export const AdminNewCompanyPage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [slug, setSlug] = useState('');
  const [img, setImg] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const uploadRef = useRef();
  const classes = useStyles();

  const changeHandler = useCallback(() => {
    const file = uploadRef.current.files.item(0);

    if (FileReader && file) {
      const reader = new FileReader();
      reader.onload = () => setImg(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  useEffect(() => {
    if (uploadRef.current) {
      uploadRef.current.addEventListener('change', changeHandler);
      return () =>
        uploadRef.current.removeEventListener('change', changeHandler);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    const doc = db.collection('companies').doc();

    doc
      .set({
        name,
        slug,
        coordinates: new firebase.firestore.GeoPoint(
          ...address.center.reverse()
        )
      })
      .then(() => {
        if (uploadRef.current.files[0]) {
          storage
            .ref(`companyLogos/${doc.id}`)
            .put(uploadRef.current.files[0])
            .then(() => console.log('uploaded an image'))
            .then(() => storage.ref(`companyLogos/${doc.id}`).getDownloadURL())
            .then(() => {
              setLoading(false);
              setSuccess(true);
            });
        }
      });
  };

  return (
    <AdminPageContainer backTo="/admin/companies">
      <form onSubmit={onSubmit} className={classes.form}>
        <input type="file" ref={uploadRef} />
        {img && (
          <img
            style={{ height: 'auto', width: 'auto', maxWidth: 300 }}
            src={img}
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
          value={address}
          onChange={val => setAddress(val)}
        />
        <Button type="submit">Create</Button>
        {loading && <LinearProgress />}
        {success && 'Success!'}
      </form>
    </AdminPageContainer>
  );
};

export default AdminNewCompanyPage;
