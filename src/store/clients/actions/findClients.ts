import api from "../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const findClients = createAsyncThunk(
  "clients/find",
  async (filter, { rejectWithValue }) => {
    try {
      const url = new URL(`${api.baseURL}client`);
      url.searchParams.append("sort", "name ASC");
      url.searchParams.append("limit", "50000");
      let response = await fetch(url.toJSON());
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

export default findClients;
