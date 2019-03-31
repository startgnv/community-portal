import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Loading from './Loading';
import Error from './Error';

export const AdminCompanyPage = ({
  match: {
    params: { companyID = '' }
  },
  history: { goBack }
}) => {
  const { loading, error, value } = useDocument(
    db.doc(`companies/${companyID}`)
  );

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  if (!value) {
    return <Redirect to="/admin" />;
  }

  const company = value.data();

  return (
    <div>
      <button type="button" onClick={goBack}>
        Back
      </button>
      {company.name}
    </div>
  );
};
