import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";
import mobAvenueReducer from "./mobAvenueSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    mobAvenue: mobAvenueReducer,
    admin: adminReducer,
  },
});

export default store;
