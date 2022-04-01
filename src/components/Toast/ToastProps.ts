import { ToastType } from "@nuvolo/nuux/components/NuvoToastMessage";

export interface ToastProps {
  visible?: boolean;
  type: ToastType;
  content: string;
  confirmBtnLabel?: string;
  confirmBtn?: boolean;
  cancelBtnLabel?: string;
  cancelBtn?: boolean;
  autoClose?: boolean;
  onConfirm?(): void;
  onCancel?(): void;
}
