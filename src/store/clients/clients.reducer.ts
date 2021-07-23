import { createSlice } from "@reduxjs/toolkit";
import findClients from "./actions/findClients";

interface ClientsState {
  clients: any[];
}

const initialState = {
  clients: [],
} as ClientsState;

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findClients.fulfilled, (state, { payload }) => {
        state.clients = payload;
      })
      .addDefaultCase((state, action) => {
        console.log(action);
      });
  },
});

export default clientsSlice.reducer;
