import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null
  },
  reducers: {
    setUser: (state , action) => {
      state.user = action.payload;
      Cookies.set("user", JSON.stringify(state));
    }
  },
});

export const { setUser } = userSlice.actions;