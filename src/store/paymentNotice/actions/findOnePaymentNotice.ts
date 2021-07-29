import api from "../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const findOnePaymentNotice = createAsyncThunk(
  "paymentNotice/findone",
  async (id: number, { rejectWithValue }) => {
    try {
      let response = await fetch(`${api.baseURL}paymentNotice/${id}`);
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

export default findOnePaymentNotice;
