import React from 'react';
import { Redirect } from 'react-router-dom';

export const AdminCompanyPage = ({ company }) => {
  if (!company) {
    return <Redirect to="/admin" />;
  }
  return <div>{company.name}</div>;
};
