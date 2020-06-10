import Head from "next/head";
import { AppProps } from "next/app";
import GlobalStyles from "../utils/globalstyles";
import "gridjs/dist/theme/mermaid.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>CoViD-19 Stats</title>
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default App;
