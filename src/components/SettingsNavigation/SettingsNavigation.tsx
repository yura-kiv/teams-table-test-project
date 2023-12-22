import React from "react";
import styles from "./SettingsHeader.module.scss";

export enum TabKey {
  Account = "account",
  Teams = "teams",
}

export interface Tab {
  key: TabKey;
  label: string;
}

interface SettingsHeaderProps {
  tabs: Tab[];
  activeTab: TabKey;
  setTab: React.Dispatch<React.SetStateAction<TabKey>>;
}

const SettingsNavigation: React.FC<SettingsHeaderProps> = ({ tabs, activeTab, setTab }) => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.tabs}>
        {tabs.map(({ key, label }) => (
          <li
            className={activeTab === key ? [styles.tab, styles.active].join(" ") : styles.tab}
            key={key}
            onClick={() => setTab(key)}
          >
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SettingsNavigation;
