import api from "../../../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const findPaymentReconciliations = createAsyncThunk(
  "paymentNotice/findPaymentReconciliations",
  async (id: number, { rejectWithValue }) => {
    try {
      const url = new URL(`${api.baseURL}paymentReconciliation`);
      url.searchParams.append(
        "where",
        JSON.stringify({
          payment: id.toString(),
          paymentType: { "!=": 0 },
        })
      );
      let response = await fetch(url.toJSON());
      if (!response.ok) {
        throw response.statusText;
      }
      let data = await response.json();
      return data.sort((a: any, b: any) =>
        parseInt(a.invoice.identifier) > parseInt(b.invoice.identifier) ? 1 : -1
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default findPaymentReconciliations;
