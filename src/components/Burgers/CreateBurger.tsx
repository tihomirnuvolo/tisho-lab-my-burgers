import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Burger } from "src/types/Burger";
import { showInfoToast } from "src/store/ToastSlice";
import { addBurger, getBurgers } from "src/services/BurgerService";
import { Currencies } from "src/types/Currencies";
import { useNuvoMessages } from "@nuvolo/nuux/hooks";
import { getMessage } from "@utils/messages";
import { BurgerFormModal } from "./BurgerForm";

interface CreateBurgerProps {
  open: boolean;
  setOpen(open: boolean): void;
  setIsLoading(open: boolean): void;
}

const CreateBurgerComponent = (props: CreateBurgerProps) => {
  const msg = useNuvoMessages();
  const defaultBurger = {
    sys_id: "",
    name: "",
    list_price: 0,
    currency: Currencies.USD,
    quantity: 50,
  } as Burger;

  const { open, setOpen, setIsLoading } = props;

  const dispatch = useDispatch();
  const payload = useRef(defaultBurger);

  const saveBurger = () => {
    const resetBurgerForm = () => {
      payload.current = defaultBurger;
    };

    const onSuccess = () => {
      dispatch(
        showInfoToast({
          type: "success",
          content: getMessage(msg, "MB_NEW_BURGER_ADDED"),
        })
      );
      dispatch(getBurgers());
      resetBurgerForm();
    };

    const onFail = () => {
      dispatch(
        showInfoToast({
          type: "error",
          content: getMessage(msg, "MB_ERROR"),
        })
      );
      resetBurgerForm();
    };

    addBurger(payload.current, onSuccess, onFail).finally(() => {
      setIsLoading(false);
      setOpen(false);
    });
  };

  return (
    <BurgerFormModal
      title={getMessage(msg, "MB_NEW_BURGER")}
      open={open}
      setOpen={setOpen}
      payload={payload}
      onSave={saveBurger}
      onBuy={() => {
        // do nothing
      }}
      disabled={false}
      setIsLoading={setIsLoading}
    />
  );
};

export const CreateBurger = React.memo(CreateBurgerComponent);
