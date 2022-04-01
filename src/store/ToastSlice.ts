import { createSlice } from "@reduxjs/toolkit";
import { ToastProps } from "@components/Toast";

const toastDefaults: ToastProps = {
  visible: false,
  type: "info",
  content: "",
  confirmBtn: false,
  cancelBtn: false,
  autoClose: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onConfirm: () => {},
};

const toastSlice = createSlice({
  name: "toast",
  initialState: toastDefaults,
  reducers: {
    showConfirmToast: (state, action: { payload: ToastProps }) => {
      state.visible = true;
      state.type = action.payload.type;
      state.content = action.payload.content;
      state.confirmBtn = true;
      state.confirmBtnLabel = action.payload.confirmBtnLabel;
      state.cancelBtn = true;
      state.cancelBtnLabel = action.payload.cancelBtnLabel;
      state.onConfirm = action.payload.onConfirm;
    },
    showInfoToast: (state, action: { payload: ToastProps }) => {
      state.visible = true;
      state.type = action.payload.type;
      state.content = action.payload.content;
      state.confirmBtn = false;
      state.cancelBtn = false;
      state.autoClose = true;
    },
    hideToast: (state) => {
      state.visible = toastDefaults.visible;
      state.autoClose = toastDefaults.autoClose;
      state.onConfirm = toastDefaults.onConfirm;
    },
  },
});

export const { showConfirmToast, showInfoToast, hideToast } =
  toastSlice.actions;

export const toastProps = (state: any): ToastProps => state.toast;

export { toastSlice };
