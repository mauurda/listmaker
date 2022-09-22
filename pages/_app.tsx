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


