import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/config";
import axios from "axios"

const initialState = {
    isLoading:false,
    tasksData:[],
    pageNumber:1,
    limit:10,
    dataCount:10
}
export const createTask= createAsyncThunk(
  "create/task",
  async (user, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken")
    try {
      const response = await axios.post(`${API_URL}/admin/forget/password`, user,{
        headers: { Authorization: `Bearer ${accessToken}` }
    });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllTasks= createAsyncThunk(
    "get/tasks",
    async (user, { rejectWithValue }) => {
        const accessToken = localStorage.getItem("accessToken")
      try {
        const response = await axios.get(`${API_URL}/admin/login`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


const taskSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createTask.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createTask.fulfilled, (state, { payload }) => {
         
          state.isLoading = false;
          state.user = payload.result.data;
          localStorage.setItem('user', JSON.stringify(payload?.result?.data))
          localStorage.setItem('accessToken', payload?.result?.tokens.accessToken)
          localStorage.setItem('refreshToken', payload?.result?.tokens.refreshToken)
     toast.success(payload.serverResponse.message);
        })
        .addCase(createTask.rejected, (state, { payload }) => {
          state.isLoading = false;
          toast.error(payload.message);
        }).addCase(getAllTasks.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllTasks.fulfilled, (state, { payload }) => {
          console.log(payload,'payload')
    
     toast.success(payload.serverResponse.message);
        }).addCase(getAllTasks.rejected, (state, { payload }) => {
            state.isLoading = false;
       localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken")
        window.location.reload()
       toast.success(payload.serverResponse.message);
          })
   
       
      
    },
  });
  

  export default taskSlice.reducer;