import React, { useMemo } from "react";
import { TeamsTableHead, TeamsTableHeadValue } from "./TeamsTableHead";
import { TeamsTableBody } from "./TeamsTableBody";
import { useAppSelector } from "../../hooks/store";
import { selectUserTeams } from "../../store/slices/teams.slice";
import { TeamsHeadKeys } from "../../models/tables.models";
import styles from "./TeamsTable.module.scss";
import useSortParams from "../../hooks/useSortParams";

const headValues: TeamsTableHeadValue[] = [
  {
    key: TeamsHeadKeys.TeamName,
    label: "Team name",
    sortable: true,
  },
  {
    key: TeamsHeadKeys.Members,
    label: "Members",
    sortable: true,
  },
  {
    key: TeamsHeadKeys.Owner,
    label: "Team owner",
    sortable: false,
  },
  {
    key: TeamsHeadKeys.Created,
    label: "Created",
    sortable: true,
  },
];

const TeamsTable: React.FC = () => {
  const teams = useAppSelector(selectUserTeams);
  const { sortParams, handleSort } = useSortParams<TeamsHeadKeys>();

  const sortedTeams = useMemo(() => {
    const sortTeams = (teams: any[], key: TeamsHeadKeys | null, order: string | null) => {
      if (!key || !order) return teams;
      return teams.slice().sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];

        if (valueA < valueB) {
          return order === "asc" ? -1 : 1;
        } else if (valueA > valueB) {
          return order === "asc" ? 1 : -1;
        } else {
          return 0;
        }
      });
    };
    return sortTeams(teams, sortParams.key, sortParams.order);
  }, [teams, sortParams.key, sortParams.order]);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <TeamsTableHead
          values={headValues}
          sortParams={sortParams}
          onSort={handleSort}
        />
        <TeamsTableBody teams={sortedTeams} />
      </table>
    </div>
  );
};

export default TeamsTable;
