import Head from "next/head";
import { ChakraBaseProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import { UserProvider } from "../context/User";
import { theme } from "../libs/chakraui";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <ChakraBaseProvider theme={theme}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ChakraBaseProvider>
    </>
  );
}
