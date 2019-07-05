import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AdminJobCard from './AdminJobCard';
import AdminJobForm from './AdminJobForm';

export const AdminJobPage = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}/new`} component={AdminJobForm} />
    <Route exact path={`${path}/:jobID`} component={AdminJobCard} />
    <Route exact path={`${path}/:jobID/edit`} component={AdminJobForm} />
  </Switch>
);

export default AdminJobPage;
