import api from "../../../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const createPaymentNotices = createAsyncThunk(
  "paymentNotice/create",
  async (arg, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState() as RootState;
      const createdList = [];
      const items = state.paymentNotice.paymentNoticesCreateFormData.items;
      for (let { identifier, amount, client, payedAt } of items) {
        let response = await fetch(`${api.baseURL}paymentNotice`, {
          method: "POST",
          body: JSON.stringify({
            identifier,
            amount,
            client: client?.id,
            payedAt: new Date(payedAt || ""),
            //description: item.description,
            company: 1,
          }),
        });
        if (!response.ok) {
          throw response.statusText;
        }
        let createdItem = await response.json();
        createdList.push(createdItem);
      }
      return createdList;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default createPaymentNotices;
