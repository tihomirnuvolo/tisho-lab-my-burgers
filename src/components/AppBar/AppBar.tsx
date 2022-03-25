import React from "react";
import styled from "styled-components";
import { NuvoAppBar } from "@nuvolo/nuux/components/NuvoAppBar";
import { NuvoAppBarTitle } from "@nuvolo/nuux/components/NuvoAppBarTitle";
import { useNuvoMessages } from "@nuvolo/nuux/hooks/useNuvoMessages";
import { appTitleKey } from "@utils/constants";

export const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
`;

const TopLevel = (): JSX.Element => {
  const msg = useNuvoMessages();
  const title = msg.get(appTitleKey);
  return (
    <NavBar>
      <NuvoAppBarTitle>{title}</NuvoAppBarTitle>
    </NavBar>
  );
};

const AppBar = (): JSX.Element => {
  return <NuvoAppBar width="100%" appBar={<TopLevel />} />;
};

export { AppBar };
