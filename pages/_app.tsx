import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "../src/components/commons/layout";

const App = ({ Component, pageProps }: AppProps) => {
  const client = new ApolloClient({
    uri: "https://backend09.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Global styles={globalStyles} />
        <Component {...pageProps} />;
      </Layout>
    </ApolloProvider>
  );
};

export default App;
