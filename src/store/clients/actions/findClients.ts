import api from "../../../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Client } from "../../../@types/client";
const findClients = createAsyncThunk(
  "clients/find",
  async (filter, { rejectWithValue }) => {
    try {
      const findMethod = async (model: string) => {
        const url = new URL(`${api.baseURL}${model}`);
        url.searchParams.append("sort", "name ASC");
        url.searchParams.append("limit", "50000");
        let response = await fetch(url.toJSON());
        if (!response.ok) {
          throw response.statusText;
        }
        let data: Client[] = await response.json();
        return data;
      };

      const [clients, clientsVigilancia] = await Promise.all([
        await findMethod("client"),
        await findMethod("clientvigilancia"),
      ]);
      return [...clients, ...clientsVigilancia];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default findClients;
