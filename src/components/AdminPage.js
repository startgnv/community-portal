import React from 'react';
import { Route } from 'react-router-dom';
import { AdminCompanyPage } from './AdminCompanyPage';
import { AdminIndex } from './AdminIndex';
import { AdminRoute } from './AdminRoute';
import { AdminLogin } from './AdminLogin';

export const AdminPage = () => (
  <>
    <AdminRoute exact path="/admin" component={AdminIndex} />
    <Route exact path="/admin/login" component={AdminLogin} />
    <AdminRoute
      exact
      path="/admin/companies/:company"
      component={AdminCompanyPage}
    />
  </>
);

export default AdminPage;
