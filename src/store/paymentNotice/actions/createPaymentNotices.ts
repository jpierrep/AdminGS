import api from "../../../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const createPaymentNotices = createAsyncThunk(
  "paymentNotice/create",
  async (arg, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState() as RootState;
      const createdList = [];
      for (let item of state.paymentNotice.paymentNoticesCreateFormData.items) {
        let response = await fetch(`${api.baseURL}paymentNotice`, {
          method: "POST",
          body: JSON.stringify({
            amount: item.amount,
            client: item.client?.id,
            payedAt: item.payedAt,
            description: item.description,
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
