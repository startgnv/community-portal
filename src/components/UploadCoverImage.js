import React, { useState, useRef, useEffect, useCallback } from 'react';
import { storage } from '../firebase';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  img: {
    display: 'block',
    width: '100%',
    paddingBottom: '30%',
    backgroundImage: ({ src }) => `url(${src})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'black',
    '&:hover': {
      opacity: 0.5
    }
  }
}));

export const UploadCoverImage = ({
  src,
  companyID = '',
  onUploadComplete = () => {},
  ...imgProps
}) => {
  const [, /* progress */ setProgress] = useState(0);
  const [, /* imageReady */ setImageReady] = useState(false);
  const classes = useStyles({ src });
  const uploadRef = useRef();

  useEffect(() => {
    if (src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageReady(true);
        setProgress(0);
      };
    } else if (src === '') {
      setImageReady(true);
    }
  }, [src]);

  const changeHandler = useCallback(() => {
    const file = uploadRef.current.files.item(0);

    const task = storage.ref(`companyCovers/${companyID}`).put(file);
    setProgress(0);
    setImageReady(false);

    task.on('state_changed', snapshot => {
      setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    });

    task.then(({ ref }) => ref.fullPath).then(onUploadComplete);
  }, [companyID, onUploadComplete]);

  useEffect(() => {
    if (uploadRef.current) {
      const uploadEl = uploadRef.current;
      uploadEl.addEventListener('change', changeHandler);
      return () => uploadEl.removeEventListener('change', changeHandler);
    }
  }, [changeHandler]);

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
