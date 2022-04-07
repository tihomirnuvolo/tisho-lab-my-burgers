/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import { NuvoModal } from "@nuvolo/nuux/components/NuvoModal";
import { Item, NuvoForm } from "@nuvolo/nuux/components/NuvoForm";
import { Burger } from "src/types/Burger";
import { NuvoButton } from "@nuvolo/nuux/components/NuvoButton";
import { useSelector } from "react-redux";
import { userState } from "src/store/userSlice";
import { getMessage } from "@utils/messages";
import { useNuvoMessages } from "@nuvolo/nuux/hooks";

interface BurgerFormProps {
  title: string;
  payload: React.MutableRefObject<Burger>;
  open: boolean;
  setOpen(open: boolean): void;
  onSave(): void;
  onBuy(): void;
  disabled: boolean;
  setIsLoading(open: boolean): void;
}

export const BurgerFormModal = (props: BurgerFormProps) => {
  const msg = useNuvoMessages();
  const {
    payload,
    title,
    open,
    setOpen,
    onSave,
    onBuy,
    disabled,
    setIsLoading,
  } = props;

  const [isValid, setIsValid] = useState(true);
  const [changesWereMade, setChangesWereMade] = useState(false);
  const [disableControls, setDisableControls] = useState(disabled);

  const { user } = useSelector(userState);
  const enoughMoney = (): boolean => {
    if (!user || !payload?.current?.list_price) return false;
    return user?.wallets.some((wallet) => {
      return (
        parseFloat(wallet.ref_balance.toString()) >
        parseFloat(payload.current.list_price.toString())
      );
    });
  };
  const isEnoughMoney = enoughMoney();
  const isNewRecord = (payload?.current?.sys_id?.length ?? 0) === 0;

  const _onClose = () => {
    setOpen(false);
    setChangesWereMade(false);
  };

  const _onSave = () => {
    if (!isValid) {
      return;
    }
    setDisableControls(true);
    setIsLoading(true);
    onSave();
  };

  const _onBuy = () => {
    setDisableControls(true);
    setIsLoading(true);
    onBuy();
  };

  const checkChangesMade = () => {
    if (!changesWereMade) {
      setChangesWereMade(true);
    }
  };

  const onFieldChanged = (e: {
    dataField?: string | undefined;
    value?: any;
  }) => {
    if (e.dataField) {
      payload.current = {
        ...payload.current,
        [e.dataField]: e.value,
      };
      checkChangesMade();
    }

    const isValidAfterChange =
      payload.current.name.length > 0 &&
      payload.current.quantity > 0 &&
      payload.current.list_price > 0; // && Object.values(Currencies).includes(payload.current.currency);
    if (isValid !== isValidAfterChange) {
      setIsValid(isValidAfterChange);
    }
  };

  const NotEnoughMoneyLabel = () => {
    return isEnoughMoney ? null : (
      <div style={{ marginTop: "5px" }}>
        {getMessage(msg, "MB_NOT_ENOUGH_MONEY")}
      </div>
    );
  };

  const BurgerForm = () => (
    <>
      <NuvoForm
        key={`${title}_burger_form`}
        formData={payload.current}
        onFieldDataChanged={onFieldChanged}
        width="100%"
        showRequiredMark
      >
        <Item
          dataField="name"
          label={{ text: getMessage(msg, "MB_NAME") }}
          editorType="dxTextBox"
          isRequired
          editorOptions={{
            autoResizeEnabled: true,
            disableControls,
            // onKeyUp: { handleNameKeyUp },
          }}
          colCount={1}
          colSpan={1}
        />
        <Item
          dataField="list_price"
          editorType="dxNumberBox"
          label={{ text: `${getMessage(msg, "MB_PRICE")} (USD)` }}
          isRequired
          editorOptions={{
            format: { precision: 2 },
            disableControls,
          }}
          colCount={1}
          colSpan={2}
        />
        <Item
          dataField="quantity"
          editorType="dxNumberBox"
          isRequired
          label={{ text: getMessage(msg, "MB_QUANTITY") }}
          editorOptions={{
            format: { precision: 0 },
            disableControls,
          }}
          colCount={1}
          colSpan={4}
        />
      </NuvoForm>
      <div
        style={{
          padding: "30px 0 10px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <NuvoButton
          label={getMessage(msg, "MB_SAVE")}
          disabled={!changesWereMade || !isValid}
          onClick={_onSave}
        />
        <div
          style={{ textAlign: "end", display: isNewRecord ? "none" : "block" }}
        >
          <NuvoButton
            label={getMessage(msg, "MB_BUY")}
            disabled={changesWereMade || !isEnoughMoney}
            onClick={_onBuy}
          />
          <NotEnoughMoneyLabel />
        </div>
      </div>
    </>
  );

  return (
    <NuvoModal
      visible={open}
      key={`burger_form${title}`}
      title={title}
      onClose={_onClose}
      content={BurgerForm()}
    />
  );
};
