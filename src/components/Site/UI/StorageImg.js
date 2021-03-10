import React from 'react';
import firebaseClient from 'src/firebase/client';
import { useDownloadURL } from 'react-firebase-hooks/storage';

const StorageImg = ({ path, ...imgProps }) => {
  const [url] = useDownloadURL(path ? firebaseClient.storage().ref(path) : '');
  return <img src={url} {...imgProps} alt="" />;
};

export default React.memo(StorageImg);
