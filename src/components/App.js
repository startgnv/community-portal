import React, { useEffect, useRef } from 'react';
import { createGlobalStyle } from 'styled-components/macro';
import { ThemeProvider } from 'styled-components';
import theme from './utils/theme';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import ReactGA from 'react-ga';
import { AppProvider } from './AppContext';
import HomePage from './Site/Home/HomePage';
import CompaniesPage from './Site/Companies/CompaniesPage';
import CompanyPage from './Site/Company/CompanyPage';
import AboutPage from './Site/About/AboutPage';
import EcosystemPage from './Site/Ecosystem/EcosystemPage';
import JobPage from './Site/Job/JobPage';
import JobsPage from './Site/Jobs/JobsPage';
import AddCompanyPage from './Site/Company/AddCompanyPage';
import Admin from './Admin/Admin';
import AdminRoute from './AdminRoute';
import LoginPage from './Admin/LoginPage';
import Header from './Site/Header/Header';
import Sidebar from './Site/UI/Sidebar';
import Article from './Site/Blog/Article';
import Catalog from './Site/Blog/Catalog';
import Footer from './Site/Footer/Footer';

ReactGA.initialize('UA-138572620-3');

const ScrollToTop = withRouter(({ location: { pathname = '' }, children }) => {
  const prevPath = usePrevious(pathname);
  if (pathname !== prevPath && prevPath) {
    window.scrollTo(0, 0);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  return children;
});

export const usePrevious = value => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

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
  '/add-company',
  '/blog/:articleSlug',
  '/blog'
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
              <Route exact path="/ecosystem" component={EcosystemPage} />
              <Route exact path="/blog" component={Catalog} />
              <Route exact path="/blog/:articleSlug" component={Article} />
              <Route exact path="/admin/login" component={LoginPage} />
              <AdminRoute path="/admin" component={Admin} />
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
