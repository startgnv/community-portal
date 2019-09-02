import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './HomePage';
import CompaniesPage from './CompaniesPage';
import AboutPage from './AboutPage';
import EcosystemPage from './EcosystemPage';
import JobPage from './JobPage';
import JobsPage from './JobsPage';
import WhyGainesvillePage from './WhyGainesvillePage';
import AdminPage from './AdminPage';
import AdminRoute from './AdminRoute';
import AdminLogin from './AdminLogin';
import Header from './Header';
import Footer from './Footer';
import { CssBaseline } from '@material-ui/core';

const GlobalStyle = createGlobalStyle`

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-family: 'Montserrat', sans-serif;
    color: ${({ theme }) => theme.textDark};
    background-color: #ededef;
  }

  p {
    color: ${({ theme }) => theme.textDark};
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.textDark};
    font-family: miller-banner, serif;
    font-weight: 700;
    font-style: normal;
  }
`;

const mapRoutes = ['/companies/:company', '/companies'];
const publicRoutes = [
  ...mapRoutes,
  '/',
  '/jobs',
  '/jobs/:jobId',
  '/about',
  '/ecosystem',
  '/why-gainesville'
];

export const App = () => (
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <>
        <Router>
          <Route exact path={publicRoutes} component={Header} />
          <Switch>
            <Route exact path={mapRoutes} component={CompaniesPage} />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/ecosystem" component={EcosystemPage} />
            <Route exact path="/jobs" component={JobsPage} />
            <Route exact path="/jobs/:jobID" component={JobPage} />
            <Route
              exact
              path="/why-gainesville"
              component={WhyGainesvillePage}
            />
            <Route exact path="/admin/login" component={AdminLogin} />
            <AdminRoute path="/admin" component={AdminPage} />
          </Switch>
          <Route exact path={publicRoutes} component={Footer} />
        </Router>
        <GlobalStyle />
      </>
    </ThemeProvider>
  </>
);

export default App;
