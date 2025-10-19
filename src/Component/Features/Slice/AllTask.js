import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllEmployeeTasks = createAsyncThunk(
  "employeeTasks/getAll",
  async (_, { rejectWithValue }) => {
    try {
          const authData = localStorage.getItem("Auth");
      const parsedAuth = JSON.parse(authData);
      const token = parsedAuth?.token;

      console.log(token, "token in employee");
      const { data } = await axios.get("http://localhost:3060/getallemployetask", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const employeeTaskSlice = createSlice({
  name: "employeeTasks",
  initialState: {
    employeeTasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployeeTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEmployeeTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeTasks = action.payload;
      })
      .addCase(getAllEmployeeTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeTaskSlice.reducer;
