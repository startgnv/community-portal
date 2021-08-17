import Document, { Html, NextScript, Head, Main } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const APP_NAME = "startGNV";
const APP_DESCRIPTION = "Gainesville's Startup, Tech, and Biotech Community";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
      return(
        <Html lang="en" dir="ltr">
            <Head>
              <meta name="application-name" content={APP_NAME} />
              <meta name="description" content={APP_DESCRIPTION} />
              <meta name="format-detection" content="telephone=no" />
              <meta name="mobile-web-app-capable" content="yes" />
              <meta name="theme-color" content="#000000" />
              
              <meta name="apple-mobile-web-app-capable" content="yes" />
              <meta name="apple-touch-fullscreen" content="yes" />
              <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
              <meta name="apple-mobile-web-app-title" content={APP_NAME} />

              {/* TODO: THESE ARE TEMPORARY, REMOVE WHEN A MORE PERMANENT SOLUTION FOR OPEN GRAPH TAGS IS IN PLACE */}
              <meta
                  name="og:title"
                  property="og:title"
                  content="startGNV - Gainesville's Startup, Tech, and Biotech Community"
              />
              <meta
                  name="og:description"
                  property="og:description"
                  content="startGNV is an initiative by startupGNV to promote and grow the Gainesville startup, tech, and biotech communities."
              />
              <meta name="og:image" property="og:image" content="https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/home-hero.jpg?alt=media&token=29ee21af-5f63-4bb6-8198-dd29d48769f2" />
              <meta property="og:type" content="website" />
              
              <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" />
              <link rel="stylesheet" href="https://use.typekit.net/urt4ozf.css" />
              <link rel="manifest" href="/manifest.json" />
              <link rel="shortcut icon" href="/favicon.ico" />

            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
        </Html>
      )
  }
}