import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { burgersSlice } from "./burgersSlice";
import { toastSlice } from "./ToastSlice";

const rootReducer = combineReducers({
  burgers: burgersSlice.reducer,
  toast: toastSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredPaths: ["toast.onConfirm", "payload.onConfirm"],
      ignoredActionPaths: ["toast.onConfirm", "payload.onConfirm"],
    },
  }),
});

export default store;
