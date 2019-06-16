import React, { useState, useRef, useEffect, useCallback } from 'react';
import { storage } from '../firebase';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  img: {
    display: 'block',
    width: '100%',
    paddingBottom: '30%',
    backgroundImage: ({ downloadURL }) => `url(${downloadURL})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'black',
    '&:hover': {
      opacity: 0.5
    }
  }
}));

export const UploadCoverImage = ({ companyID = '', ...imgProps }) => {
  const [progress, setProgress] = useState(0);
  const [imageReady, setImageReady] = useState(false);
  const urlRef = useRef(storage.ref(`companyCovers/${companyID}`));
  const [downloadURL, setDownloadURL] = useState();
  const classes = useStyles({ downloadURL });
  const uploadRef = useRef();
  const uploadEl = uploadRef.current;

  useEffect(() => {
    if (downloadURL) {
      const img = new Image();
      img.src = downloadURL;
      img.onload = () => {
        setImageReady(true);
        setProgress(0);
      };
    } else if (downloadURL === '') {
      setImageReady(true);
    }
  }, [downloadURL]);

  useEffect(() => {
    urlRef.current
      .getDownloadURL()
      .then(setDownloadURL)
      .catch(() => setDownloadURL(''));
  }, []);

  const changeHandler = useCallback(() => {
    const file = uploadRef.current.files.item(0);

    const task = urlRef.current.put(file);
    setProgress(0);
    setImageReady(false);

    task.on('state_changed', snapshot => {
      setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    });

    task.then(() => urlRef.current.getDownloadURL()).then(setDownloadURL);
  }, []);

  useEffect(() => {
    if (uploadEl) {
      uploadEl.addEventListener('change', changeHandler);
      return () => uploadEl.removeEventListener('change', changeHandler);
    }
  }, [uploadEl, changeHandler]);

  return (
    <>
      <div
        className={classes.img}
        {...imgProps}
        onClick={e => uploadRef.current.click()}
      />

      <input type="file" hidden ref={uploadRef} />
    </>
  );
};

export default UploadCoverImage;
