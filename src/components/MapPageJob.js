import React from 'react';
import { Redirect } from 'react-router-dom';

export const MapPageJob = ({
  history: { goBack },
  job: { title: jobTitle } = {},
  company: { name: companyName } = {}
}) => {
  if (!jobTitle) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <button type="button" onClick={goBack}>
        Back
      </button>
      <p>{jobTitle}</p>
      <p>{companyName}</p>
    </div>
  );
};

export default MapPageJob;
