import React from "react";
import styled from "styled-components";
import {
  NuvoToastMessage,
  ActionButton,
} from "@nuvolo/nuux/components/NuvoToastMessage";
import { ToastProps } from "./ToastProps";

const ToastElement = styled(NuvoToastMessage)`
  .dx-toast-success {
    padding: 15px 15px 0 15px;
  }
  .dx-toast-info {
    padding: 15px 15px 0 15px;
  }
  .dx-toast-error {
    padding: 15px 15px 0 15px;
    background-color: #fad3c7;
    .MuiIcon-root + div {
      color: ${({ theme }) => theme.nuvo.colors.ui.dark3};
    }
    .MuiSvgIcon-root {
      color: #dc153d;
    }
  }
  .dx-toast-warning {
    padding: 15px 15px 0 15px;
  }
`;

export const Toast = (props: ToastProps) => {
  const {
    type,
    onCancel,
    visible,
    autoClose,
    confirmBtnLabel,
    confirmBtn,
    onConfirm,
    cancelBtnLabel,
    cancelBtn,
    content,
  } = props;
  return (
    <ToastElement
      type={type}
      onClose={onCancel}
      visible={visible}
      autoClose={autoClose}
      onHiding={onCancel}
      actions={[
        <ActionButton
          key="confirmToast_btn"
          label={confirmBtnLabel || "Confirm"}
          visible={confirmBtn}
          primary
          onClick={onConfirm}
        />,
        <ActionButton
          key="cancelToast_btn"
          label={cancelBtnLabel || "Cancel"}
          secondary
          visible={cancelBtn}
          onClick={onCancel}
        />,
      ]}
      actionContainerWidth="300px"
    >
      {content}
    </ToastElement>
  );
};
