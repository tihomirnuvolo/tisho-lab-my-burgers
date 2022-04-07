import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Burger } from "src/types/Burger";
import { showInfoToast } from "src/store/ToastSlice";
import {
  getBurgers,
  updateBurger,
  buyBurger,
} from "src/services/BurgerService";
import { userState } from "src/store/userSlice";
import { getUserDetails } from "src/services/UserService";
import { useNuvoMessages } from "@nuvolo/nuux/hooks";
import { getMessage } from "@utils/messages";
import { BurgerFormModal } from "./BurgerForm";

interface UpdateBurgerProps {
  payload: React.MutableRefObject<Burger>;
  open: boolean;
  setOpen(open: boolean): void;
  setIsLoading(open: boolean): void;
}

const UpdateBurgerComponent = (props: UpdateBurgerProps) => {
  const msg = useNuvoMessages();
  const { payload, open, setOpen, setIsLoading } = props;
  const dispatch = useDispatch();
  const { user } = useSelector(userState);

  const onSaveBurger = () => {
    const onSuccess = () => {
      dispatch(
        showInfoToast({
          type: "success",
          content: getMessage(msg, "MB_BURGER_UPDATED"),
        })
      );
      dispatch(getBurgers());
    };

    const onFail = () => {
      dispatch(
        showInfoToast({
          type: "error",
          content: getMessage(msg, "MB_ERROR"),
        })
      );
    };

    updateBurger(payload.current, onSuccess, onFail).finally(() => {
      setIsLoading(false);
      setOpen(false);
    });
  };

  const onBuyBurger = () => {
    const onSuccess = () => {
      dispatch(
        showInfoToast({
          type: "success",
          content: getMessage(msg, "MB_BUY_SUCCESS"),
        })
      );
      dispatch(getBurgers());
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

    buyBurger(
      user?.user_sys_id ?? "",
      payload.current.sys_id,
      onSuccess,
      onFail
    ).finally(() => {
      setIsLoading(false);
      setOpen(false);
    });
  };

  return (
    <BurgerFormModal
      title={getMessage(msg, "MB_BURGER_DETAILS")}
      open={open}
      setOpen={setOpen}
      payload={payload}
      onSave={onSaveBurger}
      onBuy={onBuyBurger}
      disabled={false}
      setIsLoading={setIsLoading}
    />
  );
};

export const UpdateBurger = React.memo(UpdateBurgerComponent);
