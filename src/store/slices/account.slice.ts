import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { User } from "../../models/user.models";
import { users } from "../../helpers/getInitialData";

interface InitialState {
  user: User | null;
  isLogined: boolean;
}

const initialState: InitialState = {
  user: users[0],
  isLogined: true,
};

export const accountSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLogined = false;
    },
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLogined = true;
    },
  },
});

export const { login, logout } = accountSlice.actions;

export const selectUserAccount = (state: RootState) => state.account.user;
export const selectIsLogined = (state: RootState) => state.account.isLogined;

export default accountSlice.reducer;
