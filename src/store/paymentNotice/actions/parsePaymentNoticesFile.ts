import api from "../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const parsePaymentNoticesFile = createAsyncThunk(
  "paymentNotice/parsePaymentNoticesFile",
  async (file: any, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      let response = await fetch(
        `${api.baseURL}paymentNotice/parse-import-file`,
        {
          method: "POST",
          body: formData,
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
