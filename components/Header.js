import React from "react";
import styles from "../styles/HeaderNav.module.scss";
function HeaderNav(props) {
  return (
    <header className={styles.header}>
      <div className={styles.icon}>
        <ion-icon name="menu"></ion-icon>
      </div>
      <div className="d-flex align-items-center cursor">
        <span className={styles.avatar}>
          <ion-icon name="person-circle-outline"></ion-icon>
        </span>
        <span className="me-2">{props.user?.fullname}</span>
        <ion-icon name="chevron-down-outline"></ion-icon>
      </div>
    </header>
  );
}
export async function getStaticProps() {
  return {
    props: {
      user: userService.userValue?.fullname,
    },
  };
}
export default HeaderNav;
