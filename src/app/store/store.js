import { configureStore } from "@reduxjs/toolkit";
import documentsReducer from "./documentsSlice";

const store = configureStore({
  reducer: {
    documents: documentsReducer,
  },
});

export default store;
