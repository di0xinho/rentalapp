import { combineReducers } from "redux";
import { alertsSlice } from "./alertsSlice";
import { themeSlice } from "./themeSlice";
import { userSlice } from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";


const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
  theme: themeSlice.reducer,
  user: userSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
