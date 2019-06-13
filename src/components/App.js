import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

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
    color: ${({ theme }) => theme.textDark};
  }

  p {
    color: ${({ theme }) => theme.textDark};
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.textDark};
  }
`;

export const App = () => (
  <>
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  </>
);

export default App;
