import api from "../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const login = createAsyncThunk(
  "userAuthentication/login",
  async (formData: object, { rejectWithValue }) => {
    function timeout() {
      return new Promise((resolve) => setTimeout(resolve, 800));
    }
    await timeout();
    return {
      id: 1,
      username: "Jaime Cisternas M",
      email: "yo@jaimecisternas.dev",
    };
    /*     try {
      let response = await fetch(`${api.baseURL}user/login`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw response.statusText;
      }
      let data = await response.json();
      return data;
    } catch (error) {
      return {
        id: 1,
        username: "Jaime Cisternas M",
        email: 'yo@jaimecisternas.dev'
      };
      //return rejectWithValue(error);
    } */
  }
);

export default login;