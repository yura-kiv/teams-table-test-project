import React from "react";
import styles from "./Account.module.scss";
import { User } from "../../models/user.models";
import { useAppDispatch } from "../../hooks/store";
import { logout } from "../../store/slices/account.slice";

const Account: React.FC<{ user: User | null }> = ({ user }) => {
  const dispatch = useAppDispatch();
  if (user) {
    const { accounts, avatarSrc, email, name } = user;
    return (
      <div className={styles.wrapper}>
        <img
          className={styles.avatar}
          src={avatarSrc}
        />
        <div className={styles.infoWrapper}>
          <p className={[styles.info, styles.name].join(" ")}>Hello, {name}</p>
          <p className={styles.info}>Email: {email}</p>
          <p className={styles.info}>Accounts: {accounts}</p>
          <button
            onClick={() => {
              dispatch(logout());
            }}
            className={styles.logout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  } else {
    return <div className={styles.wrapper}>You need to login...</div>;
  }
};

export default Account;
