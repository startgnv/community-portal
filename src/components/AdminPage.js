import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AdminCompanyPage from './AdminCompanyPage';
import AdminCompaniesPage from './AdminCompaniesPage';
import AdminIndex from './AdminIndex';
import AdminJobsPage from './AdminJobsPage';
import AdminEditCompanyPage from './AdminEditCompanyPage';
import AdminJobPage from './AdminJobPage';
import AdminJobsSyncPage from './AdminJobsSyncPage';
import AdminPageContainer from './AdminPageContainer';

const AdminSettingsPage = () => 'Settings';

export const AdminPage = () => (
  <AdminPageContainer>
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
      <Route exact path="/admin/jobs/sync" component={AdminJobsSyncPage} />
      <Route path="/admin/jobs" component={AdminJobPage} />
      <Route exact path="/admin/settings" component={AdminSettingsPage} />
      <Route exact path="/admin" component={AdminIndex} />
    </Switch>
  </AdminPageContainer>
);

export default AdminPage;
