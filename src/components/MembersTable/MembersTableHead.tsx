import { MembersSortParams, Order } from "../../models/sorting.models";
import { MembersHeadKeys } from "../../models/tables.models";
import { SortArrow } from "../SortingArrow/SortArrow";
import styles from "./MembersTable.module.scss";

export interface MembersTableHeadValue {
  key: MembersHeadKeys;
  label: string;
  sortable: boolean;
}

interface MembersTableHeadProps {
  values: MembersTableHeadValue[];
  sortParams: MembersSortParams;
  onSort: (key: MembersHeadKeys) => void;
}

export const MembersTableHead: React.FC<MembersTableHeadProps> = ({
  values,
  onSort,
  sortParams,
}) => {
  return (
    <thead className={styles.header}>
      <tr className={styles.headerRow}>
        {values.map(({ key, label, sortable }) => {
          return (
            <th
              className={styles.headCell}
              key={key}
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
          );
        })}
        <th className={styles.headCell}></th>
      </tr>
    </thead>
  );
};
