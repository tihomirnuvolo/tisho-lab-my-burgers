import React from "react";
import styled from "styled-components";
import { NuvoThrobber } from "@nuvolo/nuux/components/NuvoThrobber";
import { NuvoEmptyState } from "@nuvolo/nuux/components";
import { SubText } from "@nuvolo/nuux/components/NuvoEmptyState";
import { LoaderProps, Loader } from "./Loader";

type PreLoaderMode = "page" | "component" | "inline";

export type LoaderMsgError = {
  status?: string;
  message: string;
} | null;
type ResponseError = {
  status: number;
  statusText: string;
  data: { error: any };
};
export type LoaderErrorType =
  | string
  | Error
  | LoaderMsgError
  | ResponseError
  | null;

/* eslint-disable react/require-default-props */
interface PreLoaderProps extends LoaderProps {
  mode: PreLoaderMode;
  error?: LoaderErrorType;
  invalidModeError?: string;
  primaryLabel?: string;
  primaryDescription?: string;
  secondaryLabel?: string;
  secondaryDescription?: string;
  primaryErrorMessage?: string;
  inlineText?: string;
}
/* eslint-disable react/require-default-props */

const Wrapper = styled.div`
  padding: 30px;
`;
const ErrorMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.nuvo.colors.error.middle};
`;

const DEFAULT_ERROR_MSG = "An error occurred.";

export function hasOwnPropertyTS<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  // eslint-disable-next-line no-prototype-builtins
  return obj.hasOwnProperty(prop);
}

export const getErrorMessage = (error?: LoaderErrorType): string => {
  if (!error) {
    return DEFAULT_ERROR_MSG;
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error || hasOwnPropertyTS(error, "message")) {
    return error.message;
  }
  if (hasOwnPropertyTS(error, "data")) {
    return error.data ? error.data.error.message : error.statusText;
  }

  return DEFAULT_ERROR_MSG;
};

// TODO
// - Think about displaying composite Error messages?
// - Think about a Retry functionality for component loaders
// - Implement Inline loader (here or in a seperate loader)

export const PreLoader: React.FC<PreLoaderProps> = ({
  isLoading = true,
  isFetching,
  isError,
  error,
  invalidModeError = "Invalid Mode",
  mode,
  size,
  primaryLabel,
  primaryDescription,
  secondaryLabel,
  secondaryDescription,
  primaryErrorMessage,
  inlineText,
  children,
}) => {
  if (isLoading || isFetching) {
    switch (mode) {
      case "page":
        return (
          <NuvoThrobber
            messages={{
              primaryLabel,
              primaryDescription,
              secondaryLabel,
              secondaryDescription,
            }}
            size="large"
          />
        );
      case "component":
        return <Loader isLoading={isLoading || isFetching} size={size} />;
      case "inline":
        return <span>{inlineText || primaryLabel}</span>;
      default:
        return (
          <Wrapper>
            <ErrorMessage>{invalidModeError}</ErrorMessage>
          </Wrapper>
        );
    }
  }

  if (isError || error) {
    switch (mode) {
      case "page":
        return (
          <Wrapper>
            {/* 
              The size here has to be LARGE but nuux currently has an issue with rendering SVGs 
            */}
            <NuvoEmptyState size="SMALL" type="Neutral">
              {primaryErrorMessage || DEFAULT_ERROR_MSG}
              <SubText>{getErrorMessage(error)}</SubText>
            </NuvoEmptyState>
          </Wrapper>
        );
      case "component":
        return (
          <Wrapper>
            <ErrorMessage>{getErrorMessage(error)}</ErrorMessage>
          </Wrapper>
        );
      case "inline":
        return <span>{getErrorMessage(error)}</span>;
      default:
        return (
          <Wrapper>
            <ErrorMessage>{invalidModeError}</ErrorMessage>
          </Wrapper>
        );
    }
  }

  return <>{children}</>;
};
