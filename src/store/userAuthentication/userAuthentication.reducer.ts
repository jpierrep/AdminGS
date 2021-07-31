import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../@types/user";
import login from "./actions/login";
import logout from "./actions/logout";

interface UserAuthenticationState {
  user?: User;
  loginStatus: string;
  logoutStatus: string;
}

const initialState = {
  user: undefined,
  loginStatus: "initial",
  logoutStatus: "initial",
} as UserAuthenticationState;

const userAuthenticationSlice = createSlice({
  name: "userAuthentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginStatus = "pending";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loginStatus = "fulfilled";
      })
      .addCase(login.rejected, (state) => {
        state.loginStatus = "rejected";
      })
      .addCase(logout.pending, (state) => {
        state.logoutStatus = "pending";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = undefined;
        state.logoutStatus = "fulfilled";
      })
      .addDefaultCase((state, action) => {
        //console.log(action);
      });
  },
});

export default userAuthenticationSlice.reducer;
