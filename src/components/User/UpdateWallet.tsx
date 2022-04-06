import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Wallet } from "src/types/Wallet";
import { showInfoToast } from "src/store/ToastSlice";
import { getUserDetails, updateWallet } from "src/services/UserService";
import { userState } from "src/store/userSlice";
import { WalletFormModal } from "./WalletForm";

interface UpdateWalletProps {
  payload: React.MutableRefObject<Wallet>;
  open: boolean;
  setOpen(open: boolean): void;
  setIsLoading(open: boolean): void;
}

const UpdateWalletComponent = (props: UpdateWalletProps) => {
  //   const msg = useNuvoMessages();
  const { payload, open, setOpen, setIsLoading } = props;
  const dispatch = useDispatch();
  const { user } = useSelector(userState);

  const onSaveWallet = () => {
    const onSuccess = () => {
      dispatch(
        showInfoToast({
          type: "success",
          content: "Wallet info updated!", // getMessage(msg, "RE_SUCCESSFULLY_CREATED_PAYMENT"),
        })
      );
      dispatch(getUserDetails());
    };

    const onFail = () => {
      dispatch(
        showInfoToast({
          type: "error",
          content: "Something went wrong", // getMessage(msg, "RE_ERROR_WHILE_CREATING_PAYMENT"),
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
      title="Wallet Details"
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
