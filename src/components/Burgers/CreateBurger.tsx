import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Burger } from "src/types/Burger";
import { showInfoToast } from "src/store/ToastSlice";
import { addBurger, getBurgers } from "src/services/BurgerService";
import { Currencies } from "src/types/Currencies";
import { BurgerFormModal } from "./BurgerForm";

interface CreateBurgerProps {
  open: boolean;
  setOpen(open: boolean): void;
  setIsLoading(open: boolean): void;
}

const CreateBurgerComponent = (props: CreateBurgerProps) => {
  //   const msg = useNuvoMessages();
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
          content: "New burger added!", // getMessage(msg, "RE_SUCCESSFULLY_CREATED_PAYMENT"),
        })
      );
      dispatch(getBurgers());
      resetBurgerForm();
    };

    const onFail = () => {
      dispatch(
        showInfoToast({
          type: "error",
          content: "Something went wrong", // getMessage(msg, "RE_ERROR_WHILE_CREATING_PAYMENT"),
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
      title="New Burger"
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
