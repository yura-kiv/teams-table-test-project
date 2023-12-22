import { combineReducers } from "@reduxjs/toolkit";
import teamsSlice from "./slices/teams.slice";
import usersSlice from "./slices/users.slice";
import accountSlice from "./slices/account.slice";

export const rootReducer = combineReducers({
  teams: teamsSlice,
  users: usersSlice,
  account: accountSlice,
});
