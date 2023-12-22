import { AccessLevel, Role, Team, TeamMember } from "../models/team.models";
import { User } from "../models/user.models";
import usersJSON from "../assets/users.json";
import teamsJSON from "../assets/teams.json";

const users = usersJSON as User[];

const getOwnerMember = (user: User): TeamMember => ({
  userId: user.id,
  accessLevel: AccessLevel.Full,
  role: Role.Owner,
});

const getMembers = (users: User[]): TeamMember[] =>
  users.map((user) => ({
    userId: user.id,
    accessLevel: AccessLevel.Limited,
    role: Role.Member,
  }));

const teams: Team[] = [];
const [team1, team2, team3] = teamsJSON as Team[];
const [owner1, owner2, owner3] = [users[0], users[1], users[2]];
teams.push(
  {
    ...team1,
    ownerId: owner1.id,
    membersCount: 5,
    members: [getOwnerMember(owner1), ...getMembers(users.slice(1, 5))],
  },
  {
    ...team2,
    ownerId: owner2.id,
    membersCount: 4,
    members: [getOwnerMember(owner2), ...getMembers([...users.slice(4, 6), users[0]])],
  },
  {
    ...team3,
    ownerId: owner3.id,
    membersCount: 3,
    members: [getOwnerMember(owner3), ...getMembers(users.slice(7, 9))],
  }
);

export { users, teams };
