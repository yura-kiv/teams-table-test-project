import React from "react";
import styles from "./MembersTable.module.scss";
import { TeamMember } from "../../models/team.models";
import { User } from "../../models/user.models";
import { capitalizeFirstLetter } from "../../helpers/fromatingData";
import Dropdown from "../Dropdown/Dropdown";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { removeMember } from "../../store/slices/teams.slice";
import { selectUserAccount } from "../../store/slices/account.slice";

const DropdownMember: React.FC<{ teamId: string; userId: string }> = ({ userId, teamId }) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectUserAccount);
  const dropdownItems = [
    {
      content: <span>👋 Remove member</span>,
      eventHandler: () => {
        dispatch(removeMember({ teamId, userId, accountId: account ? account.id : null }));
      },
    },
  ];
  return <Dropdown items={dropdownItems} />;
};

const MembersTableBody: React.FC<{ members: (TeamMember & User)[]; teamId: string }> = ({
  members,
  teamId,
}) => {
  return (
    <tbody className={styles.body}>
      {members.map(({ userId, accessLevel, accounts, avatarSrc, email, name, role }) => (
        <tr
          key={userId}
          className={styles.bodyRow}
        >
          <td className={styles.bodyCell}>
            <div className={styles.informationContainer}>
              <img
                className={styles.avatar}
                src={avatarSrc}
              />
              <span className={styles.name}>{name} </span>
              <span className={styles.email}>{email}</span>
            </div>
          </td>
          <td className={styles.bodyCell}>{capitalizeFirstLetter(role)}</td>
          <td className={styles.bodyCell}>{capitalizeFirstLetter(accessLevel)}</td>
          <td className={styles.bodyCell}>{accounts}</td>
          <td className={styles.bodyCell}>
            <DropdownMember
              teamId={teamId}
              userId={userId}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default MembersTableBody;
