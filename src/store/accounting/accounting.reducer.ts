import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import findInvoices from "./actions/findInvoices";
import findPaymentNotices from "./actions/findPaymentNotices";
import createPaymentNotice from "./actions/createPaymentNotices";
import findOnePaymentNotice from "./actions/findOnePaymentNotice";
import parsePaymentNoticesFile from "./actions/parsePaymentNoticesFile";

interface AccountingState {
  invoices: any[];
  paymentNotices: any[];
  paymentNoticeShowed: {};
  paymentNoticesCreateFormData: {
    items: any[];
    identifiedAmount: number;
    unidentifiedAmount: number;
    totalAmount: number;
    identifiedQuantity: number;
    unidentifiedQuantity: number;
    totalQuantity: number;
  };
  paymentNoticesCreateFormDataItemEditing: boolean;
  paymentNoticesCreateFormDataItem: {
    id?: number;
  };
  parseFilePending: boolean;
  paymentNoticesCreatePending: boolean;
  paymentNoticesCreateFulfilled: boolean;
  paymentNoticesListFilter: {
    segmentSelected: string;
    searchText: string;
  };
}

const initialState = {
  invoices: [],
  paymentNotices: [],
  paymentNoticeShowed: {},
  paymentNoticesCreateFormData: {
    items: [],
    identifiedAmount: 0,
    unidentifiedAmount: 0,
    totalAmount: 0,
    identifiedQuantity: 0,
    unidentifiedQuantity: 0,
    totalQuantity: 0,
  },
  paymentNoticesCreateFormDataItemEditing: false,
  paymentNoticesCreateFormDataItem: {},
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
      state.paymentNoticeShowed = action.payload || {};
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
      state.paymentNoticesCreateFormDataItem = action.payload;
    },
    confirmUpdatePaymentNoticesCreateFormDataItem(state) {
/*       state.paymentNoticesCreateFormData = {
        ...state.paymentNoticesCreateFormData,
        items: state.paymentNoticesCreateFormData.items.map((item) => ({
          ...(item.id === state.paymentNoticesCreateFormDataItem.id
            ? state.paymentNoticesCreateFormDataItem
            : item),
        })),
      }; */
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
      .addCase(findInvoices.fulfilled, (state, { payload }) => {
        state.invoices = [...state.invoices, ...payload];
      })
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
        //state.paymentNotices = [...state.paymentNotices, ...payload];
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
