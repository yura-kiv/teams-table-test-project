import React, { useState } from "react";
import styles from "./Teams.module.scss";
import TeamsTable from "../../components/TeamsTable/TeamsTable";
import Dropdown from "../../components/Dropdown/Dropdown";
import Modal from "../../components/Modal/Modal";
import TeamForm from "../../components/Forms/TeamForm";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { CreateTeamPayload, createTeam } from "../../store/slices/teams.slice";
import { selectUsers } from "../../store/slices/users.slice";
import { selectUserAccount } from "../../store/slices/account.slice";

const Teams: React.FC = () => {
  const [isCreateTeamModalOpen, setCreateTeamModalOpen] = useState(false);
  const users = useAppSelector(selectUsers);
  const userAccount = useAppSelector(selectUserAccount);
  const dispatch = useAppDispatch();

  const openModal = () => {
    setCreateTeamModalOpen(true);
  };

  const closeModal = () => {
    setCreateTeamModalOpen(false);
  };

  const dropdownItems = [
    {
      content: <span>🙌 Create a new team</span>,
      eventHandler: openModal,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.name}>Teams</h2>
        <Dropdown items={dropdownItems} />
      </div>
      <TeamsTable />
      <Modal
        label="Create a new team"
        isOpen={isCreateTeamModalOpen}
        onClose={closeModal}
      >
        <TeamForm
          owner={userAccount!}
          users={users}
          onSubmit={(params: CreateTeamPayload) => {
            dispatch(createTeam(params));
            setCreateTeamModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Teams;
