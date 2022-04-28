import { SessionProvider } from "next-auth/react";

import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, session, ...pageProps }) {
  return (
    // React Fragment - <></>
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
