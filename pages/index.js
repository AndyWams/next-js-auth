import Head from "next/head";
import { userService } from "../services";
import buttonstyles from "../styles/Button.module.scss";
import Link from "next/link";
export default function Home() {
  function logout() {
    return userService.logout();
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
