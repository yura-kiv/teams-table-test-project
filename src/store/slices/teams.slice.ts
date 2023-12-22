import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { AccessLevel, Role, Team, TeamMember } from "../../models/team.models";
import { teams as initialTeams } from "../../helpers/getInitialData";
import { User } from "../../models/user.models";
import { generateUniqueId } from "../../helpers/idGenerator";

interface TeamsState {
  allTeams: Record<string, Team>;
  userTeams: Team[];
}

const initialState: TeamsState = {
  allTeams: initialTeams.reduce((acc, team) => ({ ...acc, [team.id]: team }), {}),
  userTeams: [],
};

export interface CreateTeamPayload {
  name: string;
  ownerId: string;
  members: string[];
}

export const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    addMemberToTeam: (state, action: PayloadAction<{ teamId: string; members: string[] }>) => {
      const { teamId, members } = action.payload;
      const allTeamsSearch = state.allTeams[teamId];
      const userTeamsSearch = state.userTeams.find((team) => team.id === teamId);

      if (allTeamsSearch) {
        state.allTeams[teamId] = updateTeamMembersCount(updateTeamMembers(allTeamsSearch, members));
      }

      if (userTeamsSearch) {
        state.userTeams[state.userTeams.indexOf(userTeamsSearch)] = updateTeamMembersCount(
          updateTeamMembers(userTeamsSearch, members)
        );
      }
    },
    leaveTeam: (state, action: PayloadAction<{ teamId: string; userId: string | null }>) => {
      const { teamId, userId } = action.payload;
      const allTeamsSearch = state.allTeams[teamId];
      const userTeamsSearch = state.userTeams.find((team) => team.id === teamId);

      if (!userId) return;

      if (allTeamsSearch) {
        state.allTeams[teamId] = updateTeamMembersCount(
          updateTeamMembersLeave(allTeamsSearch, userId)
        );
      }

      if (userTeamsSearch) {
        state.userTeams = state.userTeams.filter((team) => team.id !== teamId);
      }
    },
    removeMember: (
      state,
      action: PayloadAction<{ teamId: string; userId: string; accountId: string | null }>
    ) => {
      const { teamId, userId, accountId } = action.payload;
      const allTeamsSearch = state.allTeams[teamId];
      const userTeamsSearch = state.userTeams.find((team) => team.id === teamId);

      if (allTeamsSearch) {
        state.allTeams[teamId] = updateTeamMembersCount(
          updateTeamMembersRemove(allTeamsSearch, userId)
        );
      }

      if (userTeamsSearch) {
        state.userTeams[state.userTeams.indexOf(userTeamsSearch)] = updateTeamMembersCount(
          updateTeamMembersRemove(userTeamsSearch, userId)
        );

        if (userId === accountId) {
          state.userTeams = state.userTeams.filter((team) => team.id !== teamId);
        }
      }
    },
    createTeam: (state, action: PayloadAction<CreateTeamPayload>) => {
      const { name, ownerId, members } = action.payload;
      const newTeam = createNewTeam(name, ownerId, members);

      state.allTeams[newTeam.id] = newTeam;
      state.userTeams.push(newTeam);
    },
    setUserTeams: (state, action: PayloadAction<User | null>) => {
      if (!action.payload) {
        state.userTeams = [];
      } else {
        const { id } = action.payload;
        state.userTeams = Object.values(state.allTeams).filter((team) =>
          team.members.some((member) => member.userId === id)
        );
      }
    },
  },
});

export const { addMemberToTeam, removeMember, createTeam, setUserTeams, leaveTeam } =
  teamsSlice.actions;

export const selectAllTeams = (state: RootState) => Object.values(state.teams.allTeams);
export const selectUserTeams = (state: RootState) => state.teams.userTeams;

export default teamsSlice.reducer;

// Helper functions

const updateTeamMembers = (team: Team, members: string[]) => ({
  ...team,
  members: [
    ...team.members,
    ...members.map(
      (member): TeamMember => ({
        userId: member,
        role: Role.Member,
        accessLevel: AccessLevel.Full,
      })
    ),
  ],
});

const updateTeamMembersLeave = (team: Team, userId: string) => ({
  ...team,
  members: team.members.filter((member) => member.userId !== userId),
});

const updateTeamMembersRemove = (team: Team, userId: string) => ({
  ...team,
  members: team.members.filter((member) => member.userId !== userId),
});

const updateTeamMembersCount = (team: Team) => ({
  ...team,
  membersCount: team.members.length,
});

const createNewTeam = (name: string, ownerId: string, members: string[]): Team => {
  const newTeam: Team = {
    id: generateUniqueId(),
    name,
    ownerId,
    membersCount: members.length + 1,
    created: new Date().toISOString(),
    members: [
      { userId: ownerId, role: Role.Owner, accessLevel: AccessLevel.Full },
      ...members.map((member) => ({
        userId: member,
        role: Role.Member,
        accessLevel: AccessLevel.Limited,
      })),
    ],
  };
  return newTeam;
};
