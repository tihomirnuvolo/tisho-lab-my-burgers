import React from "react";
import { useDispatch } from "react-redux";
import { Burger } from "src/types/Burger";
import { showInfoToast } from "src/store/ToastSlice";
import { getBurgers, updateBurger } from "src/services/BurgerService";
import { BurgerFormModal } from "./BurgerForm";

interface UpdateBurgerProps {
  payload: React.MutableRefObject<Burger>;
  open: boolean;
  setOpen(open: boolean): void;
  refreshList(): void;
}

const UpdateBurgerComponent = (props: UpdateBurgerProps) => {
  //   const msg = useNuvoMessages();
  const { payload, open, setOpen, refreshList } = props;
  const dispatch = useDispatch();

  const saveBurger = () => {
    const onSuccess = () => {
      dispatch(
        showInfoToast({
          type: "success",
          content: "Burger info updated!", // getMessage(msg, "RE_SUCCESSFULLY_CREATED_PAYMENT"),
        })
      );
      refreshList();
      dispatch(getBurgers());
    };

    const onFail = () => {
      dispatch(
        showInfoToast({
          type: "error",
          content: "Something went wrong", // getMessage(msg, "RE_ERROR_WHILE_CREATING_PAYMENT"),
        })
      );
    };

    updateBurger(payload.current, onSuccess, onFail);
  };

  return (
    <BurgerFormModal
      title="Edit Burger"
      open={open}
      setOpen={setOpen}
      payload={payload}
      onSave={saveBurger}
      disabled={false}
    />
  );
};

export const UpdateBurger = React.memo(UpdateBurgerComponent);
