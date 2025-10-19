import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const createEmployee = createAsyncThunk(
  "employee/create",
  async (employeeData, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("Auth");
      const parsedAuth = JSON.parse(authData);
      const token = parsedAuth?.token;

      console.log(token, "token in employee");

      const { data } = await Axios.post(
        `http://localhost:3060/createemployee`,
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data.NewEmployee;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getEmployees = createAsyncThunk(
  "employee/list",
  async (_, { rejectWithValue }) => {
    try {
     const authData = localStorage.getItem("Auth");
      const parsedAuth = JSON.parse(authData);
      const token = parsedAuth?.token;

      console.log(token, "token in employee");

      const { data } = await Axios.get(`http://localhost:3060/ListEmployee`, {
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

export const editEmployee = createAsyncThunk(
  "employee/edit",
  async ({ id, employeeData }, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("Auth");
      const parsedAuth = JSON.parse(authData);
      const token = parsedAuth?.token;

      console.log(token, "token in employee");

      const { data } = await Axios.put(
        `http://localhost:3060/EditEmployee/${id}`,
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const EmployeeSlice = createSlice({
  name: "Employee",
  initialState: {
    employees: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(editEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (emp) => emp._id === action.payload._id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      });
  },
});

export default EmployeeSlice.reducer;
