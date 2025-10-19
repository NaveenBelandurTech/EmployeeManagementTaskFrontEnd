import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";



// Register User
export const userRegister = createAsyncThunk(
  "user/userRegister",
  async (user) => {
    const register = await Axios.post("http://localhost:3060/Register", user);
    if (register) {
      localStorage.setItem("Auth", JSON.stringify(register.data));
      return register.data;
    }
  }
);

// Login User
export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (user) => {
    console.log(user,'user from login Data')
    const login = await Axios.post("http://localhost:3060/Login", user);
    if (login) {
      localStorage.setItem("Auth", JSON.stringify(login.data));
      return login.data;
    }
  }
);

const IntialUserState = {
  isLoading: false,
  Users: null,
  isError: false,
  isAuth: !!localStorage.getItem("Auth"), 
};

const userSlice = createSlice({
  name: "UserSlice",
  initialState: IntialUserState,
  reducers: {
    logout: (state) => {
      state.Users = null;
      state.isAuth = false;
      localStorage.removeItem("Auth");
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(userRegister.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Users = action.payload;
      state.isError = false;
      state.isAuth = true;
    });
    builder.addCase(userRegister.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log(action.payload,'payload is not login ')
      state.isLoading = false;
      state.Users = action.payload;
      state.isError = false;
      state.isAuth = true;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isAuth = false;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
