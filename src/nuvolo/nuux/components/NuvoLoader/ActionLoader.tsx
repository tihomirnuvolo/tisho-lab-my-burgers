import React from "react";
import styled from "styled-components";
import { BaseLoaderProps, LoaderWrapper, Throbber } from "./Loader";

interface ActionLoaderProps extends BaseLoaderProps {
  // error?: Error | null;
  // overlay?: boolean;
  // size?: 'small' | 'big';
  // eslint-disable-next-line react/require-default-props
  className?: string;
}

const LoaderOverlayWrapper = styled.div`
  position: relative;
`;
LoaderOverlayWrapper.displayName = "LoaderOverlayWrapper";

const LoaderOverlay = styled(LoaderWrapper)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1500;
`;
LoaderOverlay.displayName = "LoaderOverlay";

const ActionLoader: React.FC<ActionLoaderProps> = ({
  isLoading = true,
  isFetching,
  children,
  className,
}) => {
  return (
    <LoaderOverlayWrapper className={className}>
      {(isLoading || isFetching) && (
        <LoaderOverlay
          className={`${isLoading || isFetching ? "loader-is-active" : ""}`}
        >
          <Throbber />
        </LoaderOverlay>
      )}

      {children}
    </LoaderOverlayWrapper>
  );
};

export { ActionLoader };
