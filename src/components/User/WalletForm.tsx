/* eslint-disable no-underscore-dangle */
import { NuvoButton } from "@nuvolo/nuux/components/NuvoButton";
import { Item, NuvoForm } from "@nuvolo/nuux/components/NuvoForm";
import { NuvoModal } from "@nuvolo/nuux/components/NuvoModal";
import { useNuvoMessages } from "@nuvolo/nuux/hooks";
import { getMessage } from "@utils/messages";
import React, { useState } from "react";
import { Currencies } from "src/types/Currencies";
import { Wallet } from "src/types/Wallet";

interface WalletFormProps {
  title: string;
  payload: React.MutableRefObject<Wallet>;
  open: boolean;
  setOpen(open: boolean): void;
  onSave(): void;
  disabled: boolean;
  setIsLoading(open: boolean): void;
}

export const WalletFormModal = (props: WalletFormProps) => {
  const msg = useNuvoMessages();
  const { payload, title, open, setOpen, onSave, disabled, setIsLoading } =
    props;

  const [isValid, setIsValid] = useState(true);
  const [changesWereMade, setChangesWereMade] = useState(false);
  const [disableControls, setDisableControls] = useState(disabled);

  const currenciesList = Object.values(Currencies);

  const _onClose = () => {
    setOpen(false);
    setChangesWereMade(false);
  };

  const _onSave = () => {
    if (!isValid) return;
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

    const isValidAfterChange = payload.current.balance >= 0;
    if (isValid !== isValidAfterChange) {
      setIsValid(isValidAfterChange);
    }
  };

  const WalletForm = () => {
    return (
      <>
        <NuvoForm
          key={`${title}_Wallet_form`}
          formData={payload.current}
          onFieldDataChanged={onFieldChanged}
          width="100%"
          showRequiredMark
        >
          <Item
            dataField="balance"
            editorType="dxNumberBox"
            label={{ text: getMessage(msg, "MB_BALANCE") }}
            isRequired
            editorOptions={{
              format: { precision: 2 },
              disableControls,
            }}
            colCount={1}
            colSpan={1}
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
            colSpan={2}
          />
        </NuvoForm>
        <div
          style={{
            padding: "30px 0 10px 0",
          }}
        >
          <NuvoButton
            label={getMessage(msg, "MB_SAVE")}
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
      key={`Wallet_form${title}`}
      title={title}
      onClose={_onClose}
      content={WalletForm()}
    />
  );
};
