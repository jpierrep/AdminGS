import api from "../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const findInvoices = createAsyncThunk(
  "invoice/find",
  async (filter, { rejectWithValue }) => {
    try {
      const url = new URL(`${api.baseURL}invoice`);
      url.searchParams.append("sort", "start ASC");
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

export default findInvoices;
