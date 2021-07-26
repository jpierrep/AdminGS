import api from "../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const findPaymentNotices = createAsyncThunk(
  "paymentnotice/find",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const { segmentSelected } = state.accounting.paymentNoticesListFilter;
      const url = new URL(`${api.baseURL}paymentnotice`);
      url.searchParams.append("sort", "payedAt DESC");
      if (segmentSelected) {
        url.searchParams.append(
          "where",
          JSON.stringify({
            client: segmentSelected === "pending" ? null : { "!=": null },
          })
        );
      }
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
