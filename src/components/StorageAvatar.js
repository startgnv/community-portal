import React from 'react';
import { storage } from '../firebase';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import Avatar from '@material-ui/core/Avatar';

const StorageAvatar = ({ path, ...avatarProps }) => {
  const [url] = useDownloadURL(path ? storage.ref(path) : '');
  return <Avatar src={url} {...avatarProps} />;
};

export default React.memo(StorageAvatar);
