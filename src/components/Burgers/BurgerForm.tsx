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
}

export const BurgerFormModal = (props: BurgerFormProps) => {
  //   const msg = useNuvoMessages();
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [changesWereMade, setChangesWereMade] = useState(false);

  const { payload, title, open, setOpen, onSave, disabled } = props;
  const currenciesList = Object.values(Currencies);

  const _onClose = () => {
    setOpen(false);
  };

  const _onSave = () => {
    if (!isValid) {
      return;
    }
    setIsLoading(true);
    onSave();
    _onClose();
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
  };

  const BurgerForm = () => {
    return (
      <>
        <NuvoForm
          key={`${title}_burger_form`}
          formData={payload.current}
          onFieldDataChanged={onFieldChanged}
          width="100%"
        >
          <Item
            dataField="name"
            label={{ text: "Name" }}
            editorType="dxTextBox"
            editorOptions={{
              autoResizeEnabled: true,
              disabled,
            }}
            colCount={1}
            colSpan={1}
          />
          <Item
            dataField="list_price"
            editorType="dxNumberBox"
            label={{ text: "Price" }}
            editorOptions={{
              format: { precision: 2 },
              disabled,
            }}
            colCount={1}
            colSpan={2}
          />
          <Item
            dataField="currency"
            editorType="dxRadioGroup"
            editorOptions={{
              items: currenciesList,
              layout: "horizontal",
              disabled,
            }}
            colCount={1}
            colSpan={3}
          />
          <Item
            dataField="quantity"
            editorType="dxNumberBox"
            label={{ text: "Quantity" }}
            editorOptions={{
              format: { precision: 0 },
              disabled,
            }}
            colCount={1}
            colSpan={4}
          />
        </NuvoForm>
        <NuvoButton
          label="Save"
          disabled={!changesWereMade || !isValid}
          onClick={_onSave}
        />
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
