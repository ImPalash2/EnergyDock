import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice.js";
import { userSlice } from "./features/userSlice.js";
const store = configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    user: userSlice.reducer,
  },
});
export default store;
