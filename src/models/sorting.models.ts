import { MembersHeadKeys, TeamsHeadKeys } from "./tables.models";

export enum Order {
  Asc = "asc",
  Desc = "desc",
}

export interface TeamsSortParams {
  key: TeamsHeadKeys | null;
  order: Order | null;
}

export interface MembersSortParams {
  key: MembersHeadKeys | null;
  order: Order | null;
}
