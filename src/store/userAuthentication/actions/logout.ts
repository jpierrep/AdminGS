import api from "../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const logout = createAsyncThunk(
  "userAuthentication/logout",
  async (data, { rejectWithValue }) => {
    try {
      let response = await fetch(`${api.baseURL}user/logout`);
      if (!response.ok) {
        throw response.statusText;
      }
      let data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default logout;
