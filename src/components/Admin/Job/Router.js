import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DisplayPage from './DisplayPage';
import EditPage from './EditPage';

export const Router = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}/new`} component={EditPage} />
    <Route exact path={`${path}/:jobID`} component={DisplayPage} />
    <Route exact path={`${path}/:jobID/edit`} component={EditPage} />
  </Switch>
);

export default Router;
