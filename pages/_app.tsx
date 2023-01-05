import type { AppProps } from "next/app";
import { globalstyles } from "../styles/globalstyles";
import { Global } from "@emotion/react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Global styles={globalstyles} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
