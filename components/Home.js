import { useState, useEffect } from "react";
import React from "react";
import { userService } from "../services";
import { useRouter } from "next/router";
import buttonstyles from "../styles/Button.module.scss";
import HeaderNav from "./Header";
import SideBar from "./SideBar";
import MainContent from "./MainContent";

function HomePage() {
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
    <div>
      <HeaderNav userService={userService} user={user} />
      <main>
        <SideBar />
        <MainContent />
      </main>
    </div>
  );
}

export default HomePage;
