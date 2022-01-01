import { useState, useEffect } from "react";
import Head from "next/head";
import { userService } from "../services";
import { useRouter } from "next/router";
import buttonstyles from "../styles/Button.module.scss";
export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
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
  function logout() {
    return userService.logout();
  }
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
    <div className="p-4">
      <div className="container">
        <div className="d-flex justify-content-center flex-column align-items-center">
          <h1>Hi {userService.userValue?.fullname}!</h1>
          <p>You&apos;re logged in with Next.js & JWT!!</p>
          <p>
            <button className={buttonstyles.btnlogout} onClick={logout}>
              Logout
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
