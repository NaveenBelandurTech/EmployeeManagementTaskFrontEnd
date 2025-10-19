import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";


// Create Task
export const createTask = createAsyncThunk(
  "task/create",
  async (taskData, { rejectWithValue }) => {
    try {
 const authData = localStorage.getItem("Auth");
      const parsedAuth = JSON.parse(authData);
      const token = parsedAuth?.token;
      const { data } = await Axios.post(
        "http://localhost:3060/CreateList",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.TaskCreated;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get Task List
export const getTasks = createAsyncThunk(
  "task/list",
  async (_, { rejectWithValue }) => {
    try {
      
         const authData = localStorage.getItem("Auth");
      const parsedAuth = JSON.parse(authData);
      const token = parsedAuth?.token;
      const { data } = await Axios.get("http://localhost:3060/listtask", {
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

// Edit Task
export const editTask = createAsyncThunk(
  "task/edit",
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("Auth");
      const parsedAuth = JSON.parse(authData);
      const token = parsedAuth?.token;
      const { data } = await Axios.put(
        `http://localhost:3060/EditTask/${id}`,
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.updatedTask;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const TaskReducer= createSlice({
  name: "task",
  initialState: {
    tasks: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

   
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });


    builder
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export default TaskReducer.reducer;
