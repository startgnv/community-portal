import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { firestore } from 'firebase/app';
import { NewCompanyForm } from './NewCompanyForm';
import { useCollection } from 'react-firebase-hooks/firestore';

export const AdminIndex = () => {
  const { loading, error, value } = useCollection(db.collection('companies'));
  if (loading) {
    return 'Loading';
  }
  if (error) {
    return 'error';
  }
  const onSubmit = ({ name, latitude, longitude }) => {
    db.collection('companies').add({
      name,
      coordinates: new firestore.GeoPoint(latitude, longitude)
    });
  };
  return (
    <div>
      <NewCompanyForm onSubmit={onSubmit} />

      <ul>
        {value.docs.map(doc => {
          const {
            name,
            coordinates: { latitude, longitude } = {}
          } = doc.data();
          return (
            <li key={doc.id}>
              <Link to={`/admin/companies/${name}`}>{name}</Link>
              {`-${latitude}-${longitude}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
