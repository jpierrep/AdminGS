import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import findPaymentNotices from "./actions/findPaymentNotices";
import createPaymentNotice from "./actions/createPaymentNotices";
import findOnePaymentNotice from "./actions/findOnePaymentNotice";
import parsePaymentNoticesFile from "./actions/parsePaymentNoticesFile";
import { PaymentInvoice } from "../../@types/paymentInvoice";

interface AccountingState {
  paymentNotices: PaymentInvoice[];
  paymentNoticeShowed: PaymentInvoice;
  paymentNoticesCreateFormData: {
    items: PaymentInvoice[];
  };
  paymentNoticesCreateFormDataItemEditing: boolean;
  paymentNoticesCreateFormDataItem: PaymentInvoice;
  parseFilePending: boolean;
  paymentNoticesCreatePending: boolean;
  paymentNoticesCreateFulfilled: boolean;
  paymentNoticesListFilter: {
    segmentSelected: string;
    searchText: string;
  };
}

const defaultPaymentNotice = {
  items: [],
  amount: 0,
};

const initialState = {
  paymentNotices: [],
  paymentNoticeShowed: { ...defaultPaymentNotice },
  paymentNoticesCreateFormData: {
    items: [],
  },
  paymentNoticesCreateFormDataItemEditing: false,
  paymentNoticesCreateFormDataItem: { ...defaultPaymentNotice },
  parseFilePending: false,
  paymentNoticesCreatePending: false,
  paymentNoticesCreateFulfilled: false,
  paymentNoticesListFilter: {
    segmentSelected: "pending",
    searchText: "",
  },
} as AccountingState;

const accountingSlice = createSlice({
  name: "accounting",
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
    setPaymentNoticesCreateFulfilled(state) {
      state.paymentNoticesCreateFulfilled = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findPaymentNotices.fulfilled, (state, { payload }) => {
        state.paymentNotices = [...payload];
      })
      .addCase(parsePaymentNoticesFile.pending, (state) => {
        state.parseFilePending = true;
      })
      .addCase(parsePaymentNoticesFile.fulfilled, (state, { payload }) => {
        state.paymentNoticesCreateFormData.items = payload;
        state.parseFilePending = false;
      })
      .addCase(parsePaymentNoticesFile.rejected, (state, { payload }) => {
        state.parseFilePending = false;
      })
      .addCase(createPaymentNotice.pending, (state, { payload }) => {
        state.paymentNoticesCreatePending = true;
      })
      .addCase(createPaymentNotice.fulfilled, (state, { payload }) => {
        state.paymentNoticesCreatePending = false;
        state.paymentNoticesCreateFulfilled = true;
      })
      .addCase(findOnePaymentNotice.fulfilled, (state, { payload }) => {
        state.paymentNoticeShowed = payload;
      })
      .addDefaultCase((state, action) => {
        console.log(action);
      });
  },
});

export default accountingSlice.reducer;
