import api from "../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const findPaymentNotices = createAsyncThunk(
  "paymentnotice/find",
  async (filter, { rejectWithValue }) => {
    try {
      const url = new URL(`${api.baseURL}paymentnotice`);
      url.searchParams.append("sort", "payedAt DESC");
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

export default findPaymentNotices;
