import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/config";
import axios from "axios";

const initialState = {
  isLoading: false,
  user: null,
  isForgetPassword: false,
};

export const registerUser = createAsyncThunk(
  "/api/auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/api/auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        console.log(payload, "payload");
        state.isLoading = false;
        state.user = payload.result.data;
        localStorage.setItem("user", JSON.stringify(payload?.result?.data));
        localStorage.setItem(
          "accessToken",
          payload?.result?.tokens.accessToken
        );
        localStorage.setItem(
          "refreshToken",
          payload?.result?.tokens.refreshToken
        );
        toast.success(payload.serverResponse.message);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.message);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        console.log(payload, "payload");
        state.isLoading = false;
        state.isForgetPassword = true;
        toast.success(payload.serverResponse.message);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        console.log(payload, "payload");
        state.isLoading = false;
        state.isForgetPassword = true;
        toast.success(payload.serverResponse.message);
      });
  },
});

export default authSlice.reducer;
