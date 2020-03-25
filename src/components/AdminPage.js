import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AdminCompanyPage from './AdminCompanyPage';
import AdminCompaniesPage from './AdminCompaniesPage';
import AdminIndex from './AdminIndex';
import AdminJobsPage from './AdminJobsPage';
import AdminEditCompanyPage from './AdminEditCompanyPage';
import AdminJobPage from './AdminJobPage';
import EcosystemPage from './Admin/Ecosystem';
import AdminPageContainer from './AdminPageContainer';
import { CssBaseline } from '@material-ui/core';
import SettingsPage from './Admin/Settings';

export const AdminPage = () => (
  <AdminPageContainer>
    <CssBaseline />
    <Switch>
      <Route exact path="/admin/companies" component={AdminCompaniesPage} />
      <Route
        exact
        path="/admin/companies/new"
        component={AdminEditCompanyPage}
      />
      <Route
        exact
        path="/admin/companies/:companyID/edit"
        component={AdminEditCompanyPage}
      />
      <Route
        exact
        path="/admin/companies/:companyID"
        component={AdminCompanyPage}
      />
      <Route exact path="/admin/jobs" component={AdminJobsPage} />
      <Route path="/admin/jobs" component={AdminJobPage} />
      <Route path="/admin/ecosystem" component={EcosystemPage} />
      <Route exact path="/admin/settings" component={SettingsPage} />
      <Route exact path="/admin" component={AdminIndex} />
    </Switch>
  </AdminPageContainer>
);

export default AdminPage;
