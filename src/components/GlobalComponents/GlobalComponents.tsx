import React from "react";
import { Toast } from "@components/Toast";
import { toastProps, hideToast } from "src/store/ToastSlice";
import { useDispatch, useSelector } from "react-redux";

export const GlobalComponents = (): JSX.Element => {
  const toastState = useSelector(toastProps);
  const dispatch = useDispatch();
  return (
    <Toast
      visible={toastState.visible}
      type={toastState.type}
      content={toastState.content}
      confirmBtn={toastState.confirmBtn}
      confirmBtnLabel={toastState.confirmBtnLabel}
      cancelBtn={toastState.cancelBtn}
      cancelBtnLabel={toastState.cancelBtnLabel}
      autoClose={toastState.autoClose}
      onCancel={() => dispatch(hideToast())}
      onConfirm={toastState.onConfirm}
    />
  );
};
