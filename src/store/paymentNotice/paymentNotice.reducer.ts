import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import findPaymentNotices from "./actions/findPaymentNotices";
import createPaymentNotice from "./actions/createPaymentNotices";
import findOnePaymentNotice from "./actions/findOnePaymentNotice";
import parsePaymentNoticesFile from "./actions/parsePaymentNoticesFile";
import { PaymentNotice } from "../../@types/paymentNotice";

interface PaymentNoticeState {
  paymentNotices: PaymentNotice[];
  paymentNoticeShowed: PaymentNotice;
  paymentNoticesCreateFormData: {
    items: PaymentNotice[];
  };
  paymentNoticesCreateFormDataItemEditing: boolean;
  paymentNoticesCreateFormDataItem: PaymentNotice;
  parseFilePending: boolean;
  createStatus: string;
  parseFileStatus: string;
  paymentNoticesListFilter: {
    listSegmentSelected: string;
    searchText: string;
  };
}

const initialState = {
  paymentNotices: [],
  paymentNoticeShowed: {},
  paymentNoticesCreateFormData: {
    items: [],
  },
  paymentNoticesCreateFormDataItemEditing: false,
  paymentNoticesCreateFormDataItem: {},
  parseFilePending: false,
  parseFileStatus: "initial",
  createStatus: "initial",
  paymentNoticesListFilter: {
    listSegmentSelected: "pending",
    searchText: "",
  },
} as PaymentNoticeState;

const paymentNoticeSlice = createSlice({
  name: "paymentNotice",
  initialState,
  reducers: {
    setPaymentNoticeShowed(state, action: PayloadAction<object>) {
      state.paymentNoticeShowed = action.payload || { amount: 0 };
    },
    showPaymentNoticeItemEditForm(state, action: PayloadAction<object>) {
      state.paymentNoticesCreateFormDataItem = { ...action.payload };
      state.paymentNoticesCreateFormDataItemEditing = true;
    },
    hidePaymentNoticeItemEditForm(state, action) {
      state.paymentNoticesCreateFormDataItemEditing = false;
      state.paymentNoticesCreateFormDataItem = {};
    },
    updatePaymentNoticesCreateFormDataItem(
      state,
      action: PayloadAction<object>
    ) {
      state.paymentNoticesCreateFormDataItem = {
        ...state.paymentNoticesCreateFormDataItem,
        ...action.payload,
      };
    },
    confirmUpdatePaymentNoticesCreateFormDataItem(state) {
      state.paymentNoticesCreateFormData = {
        ...state.paymentNoticesCreateFormData,
        items: state.paymentNoticesCreateFormData.items.map((item) => ({
          ...(item.id === state.paymentNoticesCreateFormDataItem.id
            ? { ...state.paymentNoticesCreateFormDataItem }
            : { ...item }),
        })),
      };
      state.paymentNoticesCreateFormDataItemEditing = false;
      state.paymentNoticesCreateFormDataItem = {};
    },
    updatePaymentNoticesListFilter(state, action: PayloadAction<object>) {
      state.paymentNoticesListFilter = {
        ...state.paymentNoticesListFilter,
        ...action.payload,
      };
    },
    setCreateStatus(state, action: PayloadAction<string>) {
      state.createStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findPaymentNotices.fulfilled, (state, { payload }) => {
        state.paymentNotices = [...payload];
      })
      .addCase(parsePaymentNoticesFile.pending, (state) => {
        state.parseFileStatus = "pending";
      })
      .addCase(parsePaymentNoticesFile.fulfilled, (state, { payload }) => {
        state.paymentNoticesCreateFormData.items = payload;
        state.parseFileStatus = "fulfilled";
      })
      .addCase(parsePaymentNoticesFile.rejected, (state, { payload }) => {
        state.parseFileStatus = "rejected";
      })
      .addCase(createPaymentNotice.pending, (state, { payload }) => {
        state.createStatus = "pending";
      })
      .addCase(createPaymentNotice.fulfilled, (state, { payload }) => {
        state.createStatus = "fulfilled";
      })
      .addCase(createPaymentNotice.rejected, (state, { payload }) => {
        state.createStatus = "rejected";
      })
      .addCase(findOnePaymentNotice.fulfilled, (state, { payload }) => {
        state.paymentNoticeShowed = payload;
      })
      .addDefaultCase((state, action) => {
        console.log(action);
      });
  },
});

export default paymentNoticeSlice.reducer;
