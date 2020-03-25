import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EcosystemListPage from './EcosystemListPage';
import EcosysteItemForm from './EcosystemItemForm';

export const EcosystemPage = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}/`} component={EcosystemListPage} />
    <Route exact path={`${path}/new`} component={EcosysteItemForm} />
    <Route exact path={`${path}/:ecoID`} component={EcosysteItemForm} />
  </Switch>
);

export default EcosystemPage;
