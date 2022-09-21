import "../styles/globals.css";
import type { AppProps } from "next/app";
import Container from "../components/Container";
import Header from "../components/Header";
import { SessionProvider } from "next-auth/react";
import Footer from "../components/Footer";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
