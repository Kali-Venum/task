import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/config";
import axios from "axios";

const initialState = {
  isLoading: false,
  tasksData: [],
  pageNumber: 1,
  limit: 10,
  dataCount: 10,
};

export const createTask = createAsyncThunk(
  "/api/task/create",
  async (user, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(`${API_URL}/task/create`, user, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllTasks = createAsyncThunk(
  "/api/task/get",
  async (data, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(`${API_URL}/task/get`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        console.log(payload, "payload")
        state.isLoading = false;
        state.user = payload.result.data;
        // toast.success(payload.serverResponse.message);
      })
      .addCase(createTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        // toast.error(payload.message);
      })
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, { payload }) => {
        console.log(payload, "payload");
        state.isLoading = false;
        state.tasksData = payload.result.data
        // toast.success(payload.serverResponse.message);
      })
      .addCase(getAllTasks.rejected, (state, { payload }) => {
        state.isLoading = false;
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.reload();
        // toast.success(payload.serverResponse.message);
      });
  },
});

export default taskSlice.reducer;
