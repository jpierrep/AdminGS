import { createSlice } from "@reduxjs/toolkit";
import login from "./actions/login";
import logout from "./actions/logout";

interface UserAuthenticationState {
  user?: {
    id: number;
    username: string;
    email: string;
  };
  loginPending: boolean;
}

const initialState = {
  user: undefined,
  loginPending: false,
} as UserAuthenticationState;

const userAuthenticationSlice = createSlice({
  name: "userAuthentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loginPending = false;
      })
      .addCase(login.pending, (state) => {
        state.loginPending = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = undefined;
      })
      .addDefaultCase((state, action) => {
        console.log(action);
      });
  },
});

export default userAuthenticationSlice.reducer;
