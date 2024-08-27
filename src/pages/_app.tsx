import Head from "next/head";
import type { AppProps } from "next/app";

import { UserProvider } from "../context/User";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Component {...pageProps} />
    </UserProvider>
  );
}
