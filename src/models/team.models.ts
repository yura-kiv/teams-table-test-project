export enum Role {
  Owner = "owner",
  Member = "member",
}

export enum AccessLevel {
  Full = "full",
  Limited = "limited",
}

export interface Team {
  id: string;
  name: string;
  ownerId: string;
  membersCount: number;
  created: string;
  members: TeamMember[];
}

export interface TeamMember {
  userId: string;
  role: Role;
  accessLevel: AccessLevel;
}
