import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import SettingsNavigation, {
  Tab,
  TabKey,
} from "./components/SettingsNavigation/SettingsNavigation";
import Teams from "./tabs/Teams/Teams";
import Account from "./tabs/Account/Account";
import { useAppSelector, useAppDispatch } from "./hooks/store";
import { selectIsLogined, selectUserAccount } from "./store/slices/account.slice";
import { setUserTeams } from "./store/slices/teams.slice";

const tabs: Tab[] = [
  {
    key: TabKey.Account,
    label: "My account",
  },
  {
    key: TabKey.Teams,
    label: "Teams",
  },
];

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserAccount);
  const isLogined = useAppSelector(selectIsLogined);
  const [tab, setTab] = useState<TabKey>(TabKey.Teams);

  useEffect(() => {
    if (user && isLogined) dispatch(setUserTeams(user));
    return () => {
      dispatch(setUserTeams(null));
    };
  }, [isLogined]);

  return (
    <>
      <h1 className={styles.header}>Settings</h1>
      <div className={styles.container}>
        <SettingsNavigation
          tabs={tabs}
          activeTab={tab}
          setTab={setTab}
        />
        {isLogined &&
          (tab === TabKey.Teams ? (
            <Teams />
          ) : tab === TabKey.Account ? (
            <Account user={user} />
          ) : null)}
        {!isLogined && <div className={styles.error}>❗You need to login. Reload page...❗</div>}
      </div>
    </>
  );
}

export default App;
