import type { AppProps } from "next/app";
import { globalstyles } from "../styles/globalstyles";
import { Global } from "@emotion/react";
import { RecoilRoot } from "recoil";
import ApolloSetting from "../src/components/commons/apollo";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ApolloSetting>
        <Global styles={globalstyles} />
        <Component {...pageProps} />
      </ApolloSetting>
    </RecoilRoot>
  );
};

export default App;
