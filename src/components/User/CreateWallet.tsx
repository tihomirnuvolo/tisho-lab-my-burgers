import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Wallet } from "src/types/Wallet";
import { showInfoToast } from "src/store/ToastSlice";
import { addWallet, getUserDetails } from "src/services/UserService";
import { Currencies } from "src/types/Currencies";
import { WalletFormModal } from "./WalletForm";

interface CreateWalletProps {
  open: boolean;
  setOpen(open: boolean): void;
  setIsLoading(open: boolean): void;
}

const CreateWalletComponent = (props: CreateWalletProps) => {
  //   const msg = useNuvoMessages();
  const defaultWallet = {
    sys_id: "",
    balance: 0,
    currency: Currencies.USD,
    ref_balance: 0,
    ref_currency: Currencies.USD,
  } as Wallet;

  const { open, setOpen, setIsLoading } = props;

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
          content: "New burger added!", // getMessage(msg, "RE_SUCCESSFULLY_CREATED_PAYMENT"),
        })
      );
      dispatch(getUserDetails());
      resetWalletForm();
    };

    const onFail = () => {
      dispatch(
        showInfoToast({
          type: "error",
          content: "Something went wrong", // getMessage(msg, "RE_ERROR_WHILE_CREATING_PAYMENT"),
        })
      );
      resetWalletForm();
    };

    addWallet(payload.current, onSuccess, onFail).finally(() => {
      setIsLoading(false);
      setOpen(false);
    });
  };

  return (
    <WalletFormModal
      title="New Wallet"
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
