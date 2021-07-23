import api from "../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const createPaymentNotices = createAsyncThunk(
  "paymentnotice/create",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const createdList = [];
      for (let item of state.accounting.paymentNoticesCreateFormData.items) {
        let response = await fetch(`${api.baseURL}paymentnotice`, {
          method: "POST",
          body: JSON.stringify({
            amount: item.amount,
            client: item.client?.id,
            payedAt: item.payedAt
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
