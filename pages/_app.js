import React, { useEffect, useRef } from 'react';
import Head from "next/head";
import Header from "src/components/Site/Header/Header";
import theme from 'src/components/utils/theme';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import ReactGA from 'react-ga';
import { AppProvider } from 'src/components/AppContext';
import Footer from 'src/components/Site/Footer/Footer';
import AdminPageContainer from 'src/components/Admin/UI/PageContainer';
import { CssBaseline } from '@material-ui/core';
import { useRouter } from 'next/router';
import AdminRoute from 'src/components/AdminRoute';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/firebase';

ReactGA.initialize('UA-138572620-3');


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

  a{
    text-decoration: none;
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


function StartGNV(props) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const [user] = useAuthState(auth);

  if(/admin(\/)?/.test(router.pathname) && !user) return <AdminRoute component={Component} {...pageProps}/>;

  if(/admin(\/)?/.test(router.pathname)){
    return(
      <AppProvider>
        <ThemeProvider theme={{...theme}}>
          <AdminPageContainer>
            <CssBaseline />
              <AdminRoute component={Component} {...pageProps}/>
          </AdminPageContainer>
        </ThemeProvider>
      </AppProvider>
    )
  }

  return (
    <AppProvider>
        <ThemeProvider theme={{...theme}}>
            <Head>
            <title>startGNV - Gainesville's Startup, Tech, and Biotech Community</title>
            <meta name='viewport' content='initial-scale=1, minimum-scale=1, maximum-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover, user-scalable=no' />
            </Head>
            {
              !(/sponsorship(\/)?$/.test(router.pathname)) &&
              <Header/>
            }
            <Component {...pageProps} />
            <Footer/>
            <GlobalStyle />
        </ThemeProvider>
    </AppProvider>
  );
};

export default StartGNV;