import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CompanyPage from './Company/CompanyPage';
import CompaniesPage from './Companies/CompaniesPage';
import WelcomePage from './WelcomePage';
import JobsPage from './Jobs/JobsPage';
import JobImporter from './Jobs/Importer';
import EditPage from './Company/EditPage';
import Router from './Job/Router';
import EcosystemPage from './Ecosystem';
import AdminPageContainer from './UI/PageContainer';
import { CssBaseline } from '@material-ui/core';
import SettingsPage from './Settings';
import CreatePage from './Company/CreatePage';

export const Admin = () => (
  <AdminPageContainer>
    <CssBaseline />
    <Switch>
      <Route exact path="/admin/companies" component={CompaniesPage} />
      <Route exact path="/admin/companies/new" component={CreatePage} />
      <Route
        exact
        path="/admin/companies/:companyID/edit"
        component={EditPage}
      />
      <Route exact path="/admin/companies/:companyID" component={CompanyPage} />
      <Route exact path="/admin/jobs" component={JobsPage} />
      <Route exact path="/admin/jobs/import" component={JobImporter} />
      <Route path="/admin/jobs" component={Router} />
      <Route path="/admin/ecosystem" component={EcosystemPage} />
      <Route exact path="/admin/settings" component={SettingsPage} />
      <Route exact path="/admin" component={WelcomePage} />
    </Switch>
  </AdminPageContainer>
);

export default Admin;
