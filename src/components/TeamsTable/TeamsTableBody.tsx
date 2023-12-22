import React, { useState } from "react";
import { Team, TeamMember } from "../../models/team.models";
import styles from "./TeamsTable.module.scss";
import ArrowDownIcon from "../Icons/ArrowDownIcon";
import MembersTable from "../MembersTable/MembersTable";
import { formatDate } from "../../helpers/fromatingData";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { selectUsers } from "../../store/slices/users.slice";
import { selectUserAccount } from "../../store/slices/account.slice";
import Dropdown from "../Dropdown/Dropdown";
import Modal from "../Modal/Modal";
import InviteForm from "../Forms/InviteForm";
import { addMemberToTeam, leaveTeam } from "../../store/slices/teams.slice";
import { createPortal } from "react-dom";
import { User } from "../../models/user.models";

const COUNT_OF_TEAM_TABLE_COLUMNS = 6;

interface TeamsTableBodyProps {
  teams: Team[];
}

interface InviteModal {
  isOpen: boolean;
  allUsers: User[];
  teamMembers: TeamMember[];
  closeModal: () => void;
  onSubmit: (memberIds: string[]) => void;
}

// Component for create portal
const InviteModal = ({ isOpen, allUsers, teamMembers, onSubmit, closeModal }: InviteModal) => {
  return createPortal(
    <Modal
      label="Invite users"
      isOpen={isOpen}
      onClose={closeModal}
    >
      <InviteForm
        allUsers={allUsers}
        teamMembers={teamMembers}
        onSubmit={onSubmit}
      />
    </Modal>,
    document.body
  );
};

const TeamRow: React.FC<{ team: Team }> = ({ team }) => {
  const dispatch = useAppDispatch();
  const userAccount = useAppSelector(selectUserAccount);
  const users = useAppSelector(selectUsers);
  const [isTeamRowOpen, setTeamRowOpen] = useState<boolean>(false);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const { created, members, membersCount, name, ownerId } = team;
  const ownerUser = users.find((user) => user.id === ownerId);

  const openModal = () => {
    setInviteModalOpen(true);
  };

  const closeModal = () => {
    setInviteModalOpen(false);
  };

  const dropdownItems = [
    {
      content: <span>🙋🏻‍♂️ Invite member</span>,
      eventHandler: () => {
        openModal();
      },
    },
    {
      content: <span>👀 Leave the team</span>,
      eventHandler: () => {
        dispatch(leaveTeam({ teamId: team.id, userId: userAccount!.id }));
      },
    },
  ];

  return (
    <>
      <tr
        className={
          isTeamRowOpen
            ? [styles.bodyRow, styles.open].join(" ")
            : [styles.bodyRow, styles.closed].join(" ")
        }
      >
        <td className={styles.bodyCell}>
          <button
            onClick={() => {
              setTeamRowOpen(!isTeamRowOpen);
            }}
            className={styles.button}
          >
            <ArrowDownIcon
              height={12}
              width={12}
              style={
                isTeamRowOpen ? { transform: "rotate(180deg)" } : { transform: "rotate(0deg)" }
              }
            />
          </button>
        </td>
        <td
          className={styles.bodyCell}
          style={{ fontSize: "1rem" }}
        >
          {name}
          {userAccount && userAccount.id === ownerId ? (
            <span className={[styles.tag, styles.tagOwner].join(" ")}>Owner</span>
          ) : (
            <span className={[styles.tag, styles.tagMember].join(" ")}>Member</span>
          )}
        </td>
        <td className={styles.bodyCell}>{membersCount} members</td>
        <td className={styles.bodyCell}>{ownerUser ? ownerUser.email : ownerId}</td>
        <td className={styles.bodyCell}>{formatDate(created)}</td>
        <td className={styles.bodyCell}>
          <Dropdown items={dropdownItems} />
        </td>
      </tr>
      <tr className={styles.teamRow}>
        {isTeamRowOpen && (
          <td
            className={styles.teamCell}
            colSpan={COUNT_OF_TEAM_TABLE_COLUMNS}
          >
            <MembersTable
              teamId={team.id}
              members={members}
            />
          </td>
        )}
      </tr>
      <InviteModal
        allUsers={users}
        closeModal={closeModal}
        isOpen={isInviteModalOpen}
        teamMembers={team.members}
        onSubmit={(members: string[]) => {
          closeModal();
          dispatch(addMemberToTeam({ teamId: team.id, members }));
        }}
      />
    </>
  );
};

export const TeamsTableBody: React.FC<TeamsTableBodyProps> = ({ teams }) => {
  return (
    <tbody>
      {teams.map((team) => (
        <TeamRow
          key={team.id}
          team={team}
        />
      ))}
    </tbody>
  );
};
