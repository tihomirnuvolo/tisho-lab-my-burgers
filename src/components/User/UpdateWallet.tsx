import React from "react";
import { useDispatch } from "react-redux";
import { Wallet } from "src/types/Wallet";
import { showInfoToast } from "src/store/ToastSlice";
import { getUserDetails, updateWallet } from "src/services/UserService";
import { useNuvoMessages } from "@nuvolo/nuux/hooks";
import { getMessage } from "@utils/messages";
import { WalletFormModal } from "./WalletForm";

interface UpdateWalletProps {
  payload: React.MutableRefObject<Wallet>;
  open: boolean;
  setOpen(open: boolean): void;
  setIsLoading(open: boolean): void;
}

const UpdateWalletComponent = (props: UpdateWalletProps) => {
  const msg = useNuvoMessages();
  const { payload, open, setOpen, setIsLoading } = props;
  const dispatch = useDispatch();

  const onSaveWallet = () => {
    const onSuccess = () => {
      dispatch(
        showInfoToast({
          type: "success",
          content: getMessage(msg, "MB_WALLET_UPDATED"),
        })
      );
      dispatch(getUserDetails());
    };

    const onFail = () => {
      dispatch(
        showInfoToast({
          type: "error",
          content: getMessage(msg, "MB_ERROR"),
        })
      );
    };

    updateWallet(payload.current, onSuccess, onFail).finally(() => {
      setIsLoading(false);
      setOpen(false);
    });
  };

  return (
    <WalletFormModal
      title={getMessage(msg, "MB_WALLET_DETAILS")}
      open={open}
      setOpen={setOpen}
      payload={payload}
      onSave={onSaveWallet}
      disabled={false}
      setIsLoading={setIsLoading}
    />
  );
};

export const UpdateWallet = React.memo(UpdateWalletComponent);
