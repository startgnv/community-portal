import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components/macro';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import MapPage from './MapPage';
import AdminPage from './AdminPage';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const startups = [
  { name: 'admiral', latitude: 29.6499279, longitude: -82.3327508 },
  { name: 'feathr', latitude: 29.6507837, longitude: -82.3310367 },
  { name: 'shadow', latitude: 29.6500853, longitude: -82.3235237 }
];

export const App = () => {
  const [companies, setCompanies] = useState(startups);

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path={['/company/:company', '/']}
            render={props => <MapPage {...props} companies={companies} />}
          />
          <Route
            path="/admin"
            render={props => (
              <AdminPage
                {...props}
                companies={companies}
                onUpdate={setCompanies}
              />
            )}
          />
        </Switch>
        <Link to="/admin">Admin</Link>
        <Link to="/">Home</Link>
      </Router>
      <GlobalStyle />
    </>
  );
};

export default App;
