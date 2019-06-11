import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MapPage from './MapPage';
import AdminPage from './AdminPage';
import AdminRoute from './AdminRoute';
import AdminLogin from './AdminLogin';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
  }
`;

export const App = () => (
  <>
    <Router>
      <Switch>
        <Route
          exact
          path={['/company/:company', '/job/:jobId', '/']}
          component={MapPage}
        />
        <Route exact path="/admin/login" component={AdminLogin} />
        <AdminRoute path="/admin" component={AdminPage} />
      </Switch>
    </Router>
    <GlobalStyle />
  </>
);

export default App;
