import api from "../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const parsePaymentNoticesFile = createAsyncThunk(
  "paymentnotice/parsePaymentNoticesFile",
  async (file, { rejectWithValue }) => {
    try {
      let response = await fetch(
        `${api.baseURL}paymentNotice/parse-import-file`,
        {
          method: "POST",
        }
      );
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

export default parsePaymentNoticesFile;
