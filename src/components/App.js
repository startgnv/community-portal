import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MapPage from './MapPage';
import AdminPage from './AdminPage';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
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
        <Route path="/admin" component={AdminPage} />
      </Switch>
    </Router>
    <GlobalStyle />
  </>
);

export default App;
