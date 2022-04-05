/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import { NuvoModal } from "@nuvolo/nuux/components/NuvoModal";
import { Item, NuvoForm } from "@nuvolo/nuux/components/NuvoForm";
import { Burger } from "src/types/Burger";
import { NuvoButton } from "@nuvolo/nuux/components/NuvoButton";
import { Currencies } from "src/types/Currencies";

interface BurgerFormProps {
  title: string;
  payload: React.MutableRefObject<Burger>;
  open: boolean;
  setOpen(open: boolean): void;
  onSave(): void;
  disabled: boolean;
  setIsLoading(open: boolean): void;
}

export const BurgerFormModal = (props: BurgerFormProps) => {
  //   const msg = useNuvoMessages();
  const { payload, title, open, setOpen, onSave, disabled, setIsLoading } =
    props;

  const [isValid, setIsValid] = useState(false);
  const [changesWereMade, setChangesWereMade] = useState(false);
  const [disableControls, setDisableControls] = useState(disabled);

  const currenciesList = Object.values(Currencies);

  const _onClose = () => {
    setOpen(false);
  };

  const _onSave = () => {
    if (!isValid) {
      return;
    }
    setDisableControls(true);
    setIsLoading(true);
    onSave();
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

  // const handleNameKeyUp = (e?: any) => {
  //   console.log("handleNameKeyUp");
  //   // const { previousValue, value } = e;

  //   // const isValidAfterChange =
  //   //   value.length > 0 &&
  //   //   payload.current.quantity > 0 &&
  //   //   payload.current.list_price > 0; // && Object.values(Currencies).includes(payload.current.currency);
  //   // if (isValid !== isValidAfterChange) {
  //   //   setIsValid(isValidAfterChange);
  //   // }
  // };

  const BurgerForm = () => {
    return (
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
            label={{ text: "Name" }}
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
            label={{ text: "Price (USD)" }}
            isRequired
            editorOptions={{
              format: { precision: 2 },
              disableControls,
            }}
            colCount={1}
            colSpan={2}
          />
          {/* <Item
            dataField="currency"
            editorType="dxRadioGroup"
            editorOptions={{
              items: currenciesList,
              layout: "horizontal",
              disabled,
            }}
            colCount={1}
            colSpan={3}
          /> */}
          <Item
            dataField="quantity"
            editorType="dxNumberBox"
            isRequired
            label={{ text: "Quantity" }}
            editorOptions={{
              format: { precision: 0 },
              disableControls,
            }}
            colCount={1}
            colSpan={4}
          />
        </NuvoForm>
        <div style={{ padding: "30px 0 10px 0" }}>
          <NuvoButton
            label="Save"
            disabled={!changesWereMade || !isValid}
            onClick={_onSave}
          />
        </div>
      </>
    );
  };

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
