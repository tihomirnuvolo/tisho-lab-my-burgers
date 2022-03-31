import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import {
  NuvoDataGrid,
  NuvoDataGridOptions,
} from "@nuvolo/nuux/components/NuvoDataGrid";

import downloadIconSvg from "src/assets/download.svg";

const StyledDataGrid = styled(NuvoDataGrid)`
  ${(props) => {
    return props.height
      ? css``
      : css`
          .dx-datagrid {
            height: auto;
          }
        `;
  }}
  .dx-datagrid-export-button {
    &:not(.dx-state-hover):not(.dx-state-focused) {
      background-color: transparent;
    }
    .dx-icon-export-excel-button {
      color: ${({ theme }) => theme.nuvo.colors.primary.dark2};
      &:before {
        display: block;
        content: " ";
        background-image: url(${downloadIconSvg});
        background-size: 18px 18px;
        height: 18px;
        width: 18px;
      }
    }
  }
  .dx-datagrid-total-footer td {
    background-color: #e0e5eb;
    border: 0 !important;
  }
`;

type DataGridProps = NuvoDataGridOptions & {
  configName?: string;
  children?: React.ReactNode | React.ReactNode[];
};

export const DataGrid = forwardRef(
  (
    { children, configName, ...props }: DataGridProps,
    ref: any
  ): JSX.Element => {
    return (
      <StyledDataGrid
        {...props}
        stateStoring={{
          storageKey: configName,
          enabled: !!configName,
        }}
        ref={ref}
      >
        {children}
      </StyledDataGrid>
    );
  }
);

DataGrid.defaultProps = {
  configName: undefined,
  children: [],
};
