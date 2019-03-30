import React from 'react';
import { Redirect } from 'react-router-dom';
export const MapPageCompany = ({
  history: { goBack },
  company: { name } = {}
}) => {
  if (!name) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <button type="button" onClick={goBack}>
        Back
      </button>
      {name}
    </div>
  );
};
