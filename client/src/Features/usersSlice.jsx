import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const registerUser = createAsyncThunk(
  "users/register",
  async (data) => {
    const res = await axios.post("https://explore-oman-reviews-ley9.onrender.com/api/users/register", data);
    return res.data;
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (data) => {
    const res = await axios.post("https://explore-oman-reviews-ley9.onrender.com/api/users/login", data);
    return res.data;
  }
);


const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: userFromStorage,
  isSuccess: false,
  isError: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    }
  },

  extraReducers: (builder) => {
    builder

      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
  }
});

export const { logout } = usersSlice.actions;
export default usersSlice.reducer;
