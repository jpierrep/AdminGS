import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Types
import { PaymentNotice } from "../../@types/paymentNotice";
// Actions
import findPaymentNotices from "./actions/findPaymentNotices";
import createPaymentNotice from "./actions/createPaymentNotices";
import findOnePaymentNotice from "./actions/findOnePaymentNotice";
import parsePaymentNoticesFile from "./actions/parsePaymentNoticesFile";
import findPaymentReconciliations from "./actions/findPaymentReconciliations";
import findPendingInvoicesByClientIdentifier from "./actions/findPendingInvoicesByClientIdentifier";

interface PaymentNoticeState {
  paymentNotices: PaymentNotice[];
  findStatus: string;
  paymentNoticeShowed: PaymentNotice;
  paymentNoticesCreateFormData: {
    items: PaymentNotice[];
  };
  paymentNoticesCreateFormDataItemEditing: boolean;
  paymentNoticesCreateFormDataItem: PaymentNotice;
  clientSelectorSearchText: string;
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
  findStatus: "initial",
  paymentNoticeShowed: {},
  paymentNoticesCreateFormData: {
    items: [],
  },
  paymentNoticesCreateFormDataItemEditing: false,
  paymentNoticesCreateFormDataItem: {},
  clientSelectorSearchText: "",
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
    updateClientSelectorSearchText(state, action: PayloadAction<string>) {
      state.clientSelectorSearchText = action.payload || "";
    },
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
      .addCase(findPaymentNotices.pending, (state) => {
        state.findStatus = "pending";
      })
      .addCase(findPaymentNotices.fulfilled, (state, { payload }) => {
        state.paymentNotices = [...payload];
        state.findStatus = "fulfilled";
      })
      .addCase(findPaymentNotices.rejected, (state) => {
        state.findStatus = "rejected";
      })
      .addCase(findPaymentReconciliations.pending, (state) => {})
      .addCase(findPaymentReconciliations.fulfilled, (state, { payload }) => {
        state.paymentNoticeShowed.reconciliations = payload;
      })
      .addCase(findPaymentReconciliations.rejected, (state, { payload }) => {})
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
      .addCase(
        findPendingInvoicesByClientIdentifier.fulfilled,
        (state, { payload }) => {
          if (state.paymentNoticesCreateFormDataItem.client) {
            state.paymentNoticesCreateFormDataItem.client.invoices = payload;
          }
        }
      )
      .addDefaultCase((state, action) => {
        console.log(action);
      });
  },
});

export default paymentNoticeSlice.reducer;
