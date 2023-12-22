import { Order, TeamsSortParams } from "../../models/sorting.models";
import { TeamsHeadKeys } from "../../models/tables.models";
import { SortArrow } from "../SortingArrow/SortArrow";
import styles from "./TeamsTable.module.scss";

export interface TeamsTableHeadValue {
  key: TeamsHeadKeys;
  label: string;
  sortable: boolean;
}

export interface TeamsTableHeadProps {
  values: TeamsTableHeadValue[];
  sortParams: TeamsSortParams;
  onSort: (key: TeamsHeadKeys) => void;
}

export const TeamsTableHead: React.FC<TeamsTableHeadProps> = ({ values, sortParams, onSort }) => {
  return (
    <thead className={styles.head}>
      <tr className={styles.headRow}>
        <th></th>
        {values.map(({ key, label, sortable }) => (
          <th
            key={key}
            className={styles.headCell}
            onClick={() => sortable && onSort(key)}
          >
            <span>{label}</span>
            {sortable && (
              <SortArrow
                order={
                  sortParams.key === key
                    ? sortParams.order === Order.Asc
                      ? Order.Asc
                      : Order.Desc
                    : null
                }
              />
            )}
          </th>
        ))}
        <th></th>
      </tr>
    </thead>
  );
};
