import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AdminCompanyPage from './AdminCompanyPage';
import AdminCompaniesPage from './AdminCompaniesPage';
import AdminIndex from './AdminIndex';
import AdminJobsPage from './AdminJobsPage';

const AdminJobPage = () => 'A job';
const AdminJobEditPage = () => 'Editing A job';
const AdminSettingsPage = () => 'Settings';

export const AdminPage = () => (
  <Switch>
    <Route exact path="/admin/companies" component={AdminCompaniesPage} />
    <Route
      exact
      path="/admin/companies/:companyID"
      component={AdminCompanyPage}
    />
    <Route path="/admin/jobs" component={AdminJobsPage} />
    <Route exact path="/admin/settings" component={AdminSettingsPage} />
    <Route exact path="/admin" component={AdminIndex} />
  </Switch>
);

export default AdminPage;
