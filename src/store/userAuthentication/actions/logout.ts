import api from "../../../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const logout = createAsyncThunk(
  "userAuthentication/logout",
  async (data, { rejectWithValue }) => {
    try {
      const timeout = () => {
        return new Promise((resolve) => setTimeout(resolve, 800));
      };
      await timeout();
      return true;
      /* let response = await fetch(`${api.baseURL}user/logout`);
      if (!response.ok) {
        throw response.statusText;
      }
      let data = await response.json();
      return data; */
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default logout;
