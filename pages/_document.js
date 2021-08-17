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
            <meta charset="utf-8" />
            <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" href="https://use.typekit.net/urt4ozf.css"/>
            <meta name="theme-color" content="#000000" />
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
            <meta name="msapplication-TileColor" content="#da532c"/>
            <meta name="theme-color" content="#ffffff"/>
            <script src="/__/firebase/8.2.6/firebase-app.js"></script>
            <script src="/__/firebase/8.2.6/firebase-auth.js"></script>
            <script src="/__/firebase/8.2.6/firebase-firestore.js"></script>
            <script src="/__/firebase/8.2.6/firebase-storage.js"></script>
            <script src="/__/firebase/8.2.6/firebase-functions.js"></script> 
            {/* <script src="/__/firebase/init.js"></script> */}
¸
            <script src="static/facebook.js"></script>
            <noscript>
              <img height="1" width="1"
            src="https://www.facebook.com/tr?id=2699241636756946&ev=PageView
            &noscript=1"/>
            </noscript>
            {/* <!-- End Facebook Pixel Code --> */}

            {/* <!-- Mailchimp --> */}
            <script id="mcjs" src = "/static/mailchimp.js"></script>
            {/* <!-- End Mailchimp --> */}

            {/* <!-- Hotjar Tracking Code for startgnv.com --> */}
            <script src="/static/hotjar.js"></script>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
  }
}