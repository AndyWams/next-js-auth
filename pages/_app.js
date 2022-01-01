import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import Script from "next/script";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    // on initial load - run auth check
  }, []);

  return (
    <Layout>
      {
        <ToastContainer
          position="top-right"
          hideProgressBar={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
      }
      <Head>
        <title>Welcome</title>
      </Head>
      <Script
        type="module"
        src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js"
        strategy="lazyOnload"
      />
      <Script
        nomodule=""
        src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.js"
        strategy="lazyOnload"
      />

      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
