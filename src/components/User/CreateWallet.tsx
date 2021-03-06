import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Wallet } from "src/types/Wallet";
import { showInfoToast } from "src/store/ToastSlice";
import { addWallet, getUserDetails } from "src/services/UserService";
import { Currencies } from "src/types/Currencies";
import { userState } from "src/store/userSlice";
import { useNuvoMessages } from "@nuvolo/nuux/hooks";
import { getMessage } from "@utils/messages";
import { WalletFormModal } from "./WalletForm";

interface CreateWalletProps {
  open: boolean;
  setOpen(open: boolean): void;
  setIsLoading(open: boolean): void;
}

const CreateWalletComponent = (props: CreateWalletProps) => {
  const msg = useNuvoMessages();
  const defaultWallet = {
    sys_id: "",
    balance: 0,
    currency: Currencies.USD,
    ref_balance: 0,
    ref_currency: Currencies.USD,
  } as Wallet;

  const { open, setOpen, setIsLoading } = props;
  const { user } = useSelector(userState);

  const dispatch = useDispatch();
  const payload = useRef(defaultWallet);

  const saveWallet = () => {
    const resetWalletForm = () => {
      payload.current = defaultWallet;
    };

    const onSuccess = () => {
      dispatch(
        showInfoToast({
          type: "success",
          content: getMessage(msg, "MB_WALLET_CREATED"),
        })
      );
      dispatch(getUserDetails());
      resetWalletForm();
    };

    const onFail = () => {
      dispatch(
        showInfoToast({
          type: "error",
          content: getMessage(msg, "MB_ERROR"),
        })
      );
      resetWalletForm();
    };

    addWallet(
      payload.current,
      user?.user_sys_id ?? "",
      onSuccess,
      onFail
    ).finally(() => {
      setIsLoading(false);
      setOpen(false);
    });
  };

  return (
    <WalletFormModal
      title={getMessage(msg, "MB_NEW_WALLET")}
      open={open}
      setOpen={setOpen}
      payload={payload}
      onSave={saveWallet}
      disabled={false}
      setIsLoading={setIsLoading}
    />
  );
};

export const CreateWallet = React.memo(CreateWalletComponent);
