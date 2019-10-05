import React from 'react';
import { storage } from '../firebase';
import { useDownloadURL } from 'react-firebase-hooks/storage';

const StorageImg = ({ path, ...imgProps }) => {
  const [url] = useDownloadURL(path ? storage.ref(path) : '');
  return <img src={url} {...imgProps} alt="" />;
};

export default React.memo(StorageImg);
