import React from "react";
import styled from "styled-components";
import { NuvoThrobber } from "@nuvolo/nuux/components/NuvoThrobber";
// import { UseQueryResult } from 'react-query';

// export type LoaderQuery<TData> = UseQueryResult<TData, Error>;

/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
export interface BaseLoaderProps {
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
}
export interface LoaderProps extends BaseLoaderProps {
  size?: "small" | "big";
}
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    width: 100%;
    height: 100%;
  }
  &.is-big {
    padding: 60px 15px;
  }
  &.loader-is-active + * {
    .loader-is-active {
      opacity: 0;
    }
  }
`;
LoaderWrapper.displayName = "LoaderWrapper";

export const Throbber = () => {
  return <NuvoThrobber size="medium" />;
};

const Loader: React.FC<LoaderProps> = ({ isLoading = true, size }) => {
  return (
    <LoaderWrapper
      className={`${size ? `is-${size}` : ""} ${
        isLoading ? "loader-is-active" : ""
      }`}
    >
      <Throbber />
    </LoaderWrapper>
  );
};

export { Loader };
