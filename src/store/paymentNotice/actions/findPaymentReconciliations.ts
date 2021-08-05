import api from "../../../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const findPaymentReconciliations = createAsyncThunk(
  "paymentNotice/findPaymentReconciliations",
  async (id: number, { rejectWithValue }) => {
    try {
      const url = new URL(`${api.baseURL}paymentReconciliation`);
      url.searchParams.append("payment", id.toString());
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

export default findPaymentReconciliations;
