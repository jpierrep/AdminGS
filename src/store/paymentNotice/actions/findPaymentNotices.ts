import api from "../../../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const findPaymentNotices = createAsyncThunk(
  "paymentNotice/find",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { listSegmentSelected } = state.paymentNotice.paymentNoticesListFilter;
      const url = new URL(`${api.baseURL}paymentNotice`);
      url.searchParams.append("sort", "payedAt DESC");
      if (listSegmentSelected) {
        url.searchParams.append(
          "where",
          JSON.stringify({
            client: listSegmentSelected === "pending" ? null : { "!=": null },
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
