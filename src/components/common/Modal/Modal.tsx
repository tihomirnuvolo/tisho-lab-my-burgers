import React from "react";
import { NuvoModal as NuvoModalBase } from "@nuvolo/nuux/components/NuvoModal";

export const NuvoModal = (
  props: React.ComponentProps<typeof NuvoModalBase>
): JSX.Element => {
  const { height, className } = props;

  return (
    <NuvoModalBase
      {...props}
      height={height ?? "fit-content"}
      className={`${className} re-modal-fix`}
    />
  );
};
