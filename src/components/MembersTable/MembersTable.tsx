import React, { useMemo } from "react";
import { TeamMember } from "../../models/team.models";
import { MembersHeadKeys } from "../../models/tables.models";
import { useAppSelector } from "../../hooks/store";
import styles from "./MembersTable.module.scss";
import { MembersTableHead, MembersTableHeadValue } from "./MembersTableHead";
import { selectUsers } from "../../store/slices/users.slice";
import MembersTableBody from "./MembersTableBody";
import useSortParams from "../../hooks/useSortParams";
import { User } from "../../models/user.models";
import { Order } from "../../models/sorting.models";

interface MembersTableProps {
  teamId: string;
  members: TeamMember[];
}

const headValues: MembersTableHeadValue[] = [
  {
    key: MembersHeadKeys.MemberName,
    label: "Team member",
    sortable: true,
  },
  {
    key: MembersHeadKeys.Role,
    label: "Role",
    sortable: false,
  },
  {
    key: MembersHeadKeys.AccessLevel,
    label: "Product features",
    sortable: false,
  },
  {
    key: MembersHeadKeys.Accounts,
    label: "Accounts",
    sortable: true,
  },
];

const MembersTable: React.FC<MembersTableProps> = ({ teamId, members }) => {
  const users = useAppSelector(selectUsers);
  const { sortParams, handleSort } = useSortParams<MembersHeadKeys>();

  const getFilteredMembers: (TeamMember & User)[] = useMemo(() => {
    const filteredUsers = users.map((user) => {
      const member = members.find((m) => m.userId === user.id);
      return member ? { ...user, ...member } : null;
    });
    return filteredUsers.filter((user): user is TeamMember & User => user !== null);
  }, [users, members]);

  const getFilteredAndSortedMembers = useMemo(() => {
    const sortMembers = (members: any[], key: MembersHeadKeys | null, order: string | null) => {
      if (!key || !order) return members;
      return members.slice().sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];

        if (valueA < valueB) {
          return order === Order.Asc ? -1 : 1;
        } else if (valueA > valueB) {
          return order === Order.Asc ? 1 : -1;
        } else {
          return 0;
        }
      });
    };
    return sortMembers(getFilteredMembers, sortParams.key, sortParams.order);
  }, [getFilteredMembers, sortParams.key, sortParams.order]);

  return (
    <table className={styles.table}>
      <MembersTableHead
        values={headValues}
        onSort={handleSort}
        sortParams={sortParams}
      />
      <MembersTableBody
        teamId={teamId}
        members={getFilteredAndSortedMembers}
      />
    </table>
  );
};

export default MembersTable;
