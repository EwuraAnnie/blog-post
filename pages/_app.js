import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    // React Fragment
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
