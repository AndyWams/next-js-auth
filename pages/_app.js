import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import Script from "next/script";
import Head from "next/head";
import { userService } from "../services";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);
  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    setUser(userService.userValue);
    const publicPaths = ["/auth/login", "/auth/register"];
    const path = url.split("?")[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/auth/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  return (
    <Layout>
      <Head>
        <title>Welcome</title>
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
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
