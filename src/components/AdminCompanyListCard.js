import React from 'react';
import { storage } from '../firebase';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import AdminListCard from './AdminListCard';

const AdminCompanyListCard = ({ coverPath, logoPath, ...cardProps }) => {
  const [logoURL] = useDownloadURL(logoPath ? storage.ref(logoPath) : '');
  const [coverURL] = useDownloadURL(coverPath ? storage.ref(coverPath) : '');
  return <AdminListCard coverSrc={coverURL} logoSrc={logoURL} {...cardProps} />;
};

export default AdminCompanyListCard;
