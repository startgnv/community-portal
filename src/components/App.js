import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { usePrevious } from '../components/hooks';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import ReactGA from 'react-ga';

import { AppProvider } from './AppContext';
import HomePage from './HomePage';
import CompaniesPage from './CompaniesPage';
import CompanyPage from './CompanyPage';
import AboutPage from './AboutPage';
import EcosystemPage from './EcosystemPage';
import JobPage from './Job/JobPage';
import JobsPage from './JobsPage';
import NewToGainesvillePage from './NewToGainesvillePage';
import AddCompanyPage from './AddCompanyPage';
import AdminPage from './AdminPage';
import AdminRoute from './AdminRoute';
import AdminLogin from './AdminLogin';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer/Footer';

ReactGA.initialize('UA-138572620-3');

const ScrollToTop = withRouter(({ location: { pathname = '' }, children }) => {
  const prevPath = usePrevious(pathname);
  if (pathname !== prevPath && prevPath) {
    window.scrollTo(0, 0);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  return children;
});

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
    font-size: 16px;
    font-family: williams-caslon-text, serif;
    color: ${({ theme }) => theme.textDark};
    background: white;
  }

  p {
    color: ${({ theme }) => theme.textDark};
    line-height: 1.4rem;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.textDark};
    font-family: williams-caslon-text, serif;
    font-weight: 400;
    font-style: normal;
  }

  h1 {
    font-size: 68px;
  }

  h2 {
    font-size: 40px;
  }

  h3 {
    font-size: 32px;
  }

  h4 {
    font-size: 24px;
  }

  h5 {
    font-size: 18px;
  }

  h6 {
    font-size: 14px;
  }
`;

const publicRoutes = [
  '/',
  '/companies',
  '/companies/:companySlug',
  '/jobs',
  '/jobs/:jobId',
  '/about',
  '/ecosystem',
  '/new-to-gainesville',
  '/add-company'
];

export const App = () => (
  <AppProvider>
    <ThemeProvider theme={theme}>
      <>
        <Router>
          <ScrollToTop>
            <Route exact path={publicRoutes} component={Header} />
            <Route exact path={publicRoutes} component={Sidebar} />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/ecosystem" component={EcosystemPage} />
              <Route exact path="/jobs" component={JobsPage} />
              <Route exact path="/jobs/:jobID" component={JobPage} />
              <Route exact path="/companies" component={CompaniesPage} />
              <Route
                exact
                path="/companies/:companySlug"
                component={CompanyPage}
              />
              <Route exact path="/add-company" component={AddCompanyPage} />
              <Route
                exact
                path="/new-to-gainesville"
                component={NewToGainesvillePage}
              />
              <Route exact path="/admin/login" component={AdminLogin} />
              <AdminRoute path="/admin" component={AdminPage} />
            </Switch>
            <Route exact path={publicRoutes} component={Footer} />
          </ScrollToTop>
        </Router>
        <GlobalStyle />
      </>
    </ThemeProvider>
  </AppProvider>
);

export default App;
