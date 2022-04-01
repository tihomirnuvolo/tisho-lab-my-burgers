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

  const { open, setOpen } = props;

  const dispatch = useDispatch();
  const payload = useRef(defaultBurger);

  const savePayment = () => {
    const resetPaymentForm = () => {
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
      resetPaymentForm();
    };
    const onFail = () => {
      dispatch(
        showInfoToast({
          type: "error",
          content: "Something went wrong", // getMessage(msg, "RE_ERROR_WHILE_CREATING_PAYMENT"),
        })
      );
      resetPaymentForm();
    };

    addBurger(payload.current, onSuccess, onFail);
  };

  return (
    <BurgerFormModal
      title="New Burger"
      open={open}
      setOpen={setOpen}
      payload={payload}
      onSave={savePayment}
      disabled={false}
    />
  );
};

export const CreateBurger = React.memo(CreateBurgerComponent);
