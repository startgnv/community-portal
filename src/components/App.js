import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MapPage from './MapPage';
import AboutPage from './AboutPage';
import AdminPage from './AdminPage';
import AdminRoute from './AdminRoute';
import AdminLogin from './AdminLogin';
import Header from './Header';
import { CssBaseline } from '@material-ui/core';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
    color: ${({ theme }) => theme.textDark};
  }

  p {
    color: ${({ theme }) => theme.textDark};
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.textDark};
  }
`;

const mapRoutes = ['/company/:company', '/job/:jobId', '/', '/companies'];
const publicRoutes = [...mapRoutes, '/about'];

export const App = () => (
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <>
        <Router>
          <Route exact path={publicRoutes} component={Header} />
          <Switch>
            <Route exact path={mapRoutes} component={MapPage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/admin/login" component={AdminLogin} />
            <AdminRoute path="/admin" component={AdminPage} />
          </Switch>
        </Router>
        <GlobalStyle />
      </>
    </ThemeProvider>
  </>
);

export default App;
