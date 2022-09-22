// From next build
//+ First Load JS shared by all              123 kB
//   ├ chunks/framework-a87821de553db91d.js   45 kB
//   ├ chunks/main-a75cf611e061d8f8.js        31 kB
//   ├ chunks/pages/_app-0dc92bd6f7cec333.js  43.3 kB
//   ├ chunks/webpack-cb7634a8b6194820.js     884 B
//   └ css/4ad3ea7dfe00de3d.css               2.96 kB

import "../styles/globals.css";
import type { AppProps } from "next/app";
import Container from "../components/Container";
import Header from "../components/Header";
import { SessionProvider } from "next-auth/react";
import Footer from "../components/Footer";
import { SelectionProvider } from "../hooks/useSelection";
import Head from "next/head";
export default function App({ Component, pageProps }: AppProps) {
  return (
    //@ts-ignore
    //session shows a next auth type bug.
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Listmaker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SelectionProvider>
        <Header />
        <Container>
          <Component {...pageProps} />
        </Container>
        <Footer />
      </SelectionProvider>
    </SessionProvider>
  );
}
