// import { ApolloProvider } from "@apollo/client";
import Head from "next/head";
// import { get, intersection } from "lodash";
// import { UserProvider } from "@auth0/nextjs-auth0";
// import { useApollo } from "src/apollo";

// import "react-dates/initialize";
// import "styles/index.css";

// function authorized(userRoles, pageRoles) {
//   if (pageRoles.length === 0 || userRoles.includes("admin")) return true;
//   const matchedRoles = intersection(userRoles, pageRoles);
//   return matchedRoles.length > 0;
// }

function startGNV(props) {
  const { Component, pageProps, router } = props;
  const { user, roles } = pageProps;

  // if (!authorized(get(user, "https://airstreamjets.com/roles", []), roles || [])) {
  //   router.push("/404");
  // }

  // const Layout = Component.Layout || (({children}) => <>{children}</>);
  // const client = useApollo(pageProps.initialApolloState);

  return (
    <>
    <Head>
      <meta name='viewport' content='initial-scale=1, minimum-scale=1, maximum-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover, user-scalable=no' />
    </Head>
    <Component {...pageProps} />
    {/* <UserProvider user={user}>
      <ApolloProvider client={client}>
        <Layout className={`${Component.className ?? ""}`}
          title={Component.Title ?? ""}
          showNav={Component.ShowNav}
          headerRight={Component.HeaderRight ?? ""}
          headerLeft={Component.HeaderLeft ?? ""}
        >
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider> 
    </UserProvider> */}
    </>
  )
}

export default startGNV;
