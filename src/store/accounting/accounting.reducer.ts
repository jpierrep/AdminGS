import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import findInvoices from "./actions/findInvoices";
import findPaymentNotices from "./actions/findPaymentNotices";
import createPaymentNotice from "./actions/createPaymentNotices";
import findOnePaymentNotice from "./actions/findOnePaymentNotice";
import parsePaymentNoticesFile from "./actions/parsePaymentNoticesFile";

interface PaymentNotice {
  id: number;
  total: string;
}

interface AccountingState {
  invoices: any[];
  paymentNotices: any[];
  paymentNoticesGroupedByDate: [];
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
}

const initialState = {
  invoices: [],
  paymentNotices: [],
  paymentNoticesGroupedByDate: [],
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
      state.paymentNoticesCreateFormData = {
        ...state.paymentNoticesCreateFormData,
        items: state.paymentNoticesCreateFormData.items.map((item) => ({
          ...(item.id === state.paymentNoticesCreateFormDataItem.id
            ? state.paymentNoticesCreateFormDataItem
            : item),
        })),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findInvoices.fulfilled, (state, { payload }) => {
        state.invoices = [...state.invoices, ...payload];
      })
      .addCase(findPaymentNotices.fulfilled, (state, { payload }) => {
        state.paymentNotices = [...payload];

        state.paymentNoticesGroupedByDate = payload.reduce(
          (list: any, item: any) => {
            let dateExists = list.find(
              (listItem: any) => listItem.dateLabel === item.payedAtLegible
            );
            if (dateExists) {
              dateExists.items.push(item);
            } else {
              list.push({
                dateLabel: item.payedAtLegible,
                items: [item],
              });
            }
            return list;
          },
          []
        );
      })
      .addCase(parsePaymentNoticesFile.pending, (state) => {
        state.parseFilePending = true;
      })
      .addCase(parsePaymentNoticesFile.fulfilled, (state, { payload }) => {
        state.paymentNoticesCreateFormData.items = payload;
        state.parseFilePending = false;
      })
      .addCase(createPaymentNotice.pending, (state, { payload }) => {
        state.paymentNoticesCreatePending = true;
      })
      .addCase(createPaymentNotice.fulfilled, (state, { payload }) => {
        state.paymentNotices = [...state.paymentNotices, ...payload];
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
