import React from 'react';
import { Route } from 'react-router-dom';
import { AdminCompanyPage } from './AdminCompanyPage';
import { AdminIndex } from './AdminIndex';

export const AdminPage = () => (
  <>
    <Route exact path="/admin" component={AdminIndex} />
    <Route
      exact
      path="/admin/companies/:company"
      component={AdminCompanyPage}
    />
  </>
);

export default AdminPage;
