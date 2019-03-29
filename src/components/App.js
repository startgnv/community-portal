import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MapPage from './MapPage';
import AdminPage from './AdminPage';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

export const App = () => (
  <>
    <Router>
      <Switch>
        <Route path="/company/:company" component={MapPage} />
        <Route path="/" component={MapPage} />
        <Route path="/admin" component={AdminPage} />
      </Switch>
    </Router>
    <GlobalStyle />
  </>
);

export default App;
