import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../stateSlice/authSlice";

const store = configureStore({
  reducer: {
    user: authSlice,
  },
});

export default store;
