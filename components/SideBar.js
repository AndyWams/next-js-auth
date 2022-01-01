import Link from "next/link";
import React from "react";
import styles from "../styles/SideNav.module.scss";
import { userService } from "../services";
function SideBar() {
  function logout() {
    return userService.logout();
  }
  return (
    <nav className={styles.sidebar}>
      <ul>
        <li>
          <Link href="/">
            <a className={styles.active}>
              <span>
                <ion-icon name="person"></ion-icon>
              </span>
              <span> User Info</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <span>
                <ion-icon name="heart-outline"></ion-icon>
              </span>
              <span> Favorites</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <span>
                <ion-icon name="star-outline"></ion-icon>
              </span>
              <span> Watchlist</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <span>
                <ion-icon name="settings-outline"></ion-icon>
              </span>
              <span> Settings</span>
            </a>
          </Link>
        </li>
        <li onClick={() => logout()}>
          <div className="d-flex align-items-center">
            <span>
              <ion-icon name="power"></ion-icon>
            </span>
            <span> Logout</span>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default SideBar;
