import api from "../../../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const findPendingInvoicesByClientIdentifier = createAsyncThunk(
  "paymentNotice/findPendingInvoicesByClientIdentifier",
  async (clientIdentifier: string, { rejectWithValue }) => {
    try {
      const url = new URL(
        `${api.baseURL}invoice/find-pending-by-client-identifier`
      );
      url.searchParams.append("clientIdentifier", clientIdentifier);
      let response = await fetch(url.toJSON(), {
        method: "POST",
      });
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

export default findPendingInvoicesByClientIdentifier;
