import React, { useEffect } from "react";
import styled from "styled-components";
import { NuvoAppBar } from "@nuvolo/nuux/components/NuvoAppBar";
import { NuvoAppBarTitle } from "@nuvolo/nuux/components/NuvoAppBarTitle";
// import { useNuvoMessages } from "@nuvolo/nuux/hooks/useNuvoMessages";
// import { appTitleKey } from "@utils/constants";
import burgerImage from "src/assets/burger.png";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "src/store/userSlice";
import { getUserDetails } from "src/services/UserService";

export const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
`;

const TopLevel = (): JSX.Element => {
  // const msg = useNuvoMessages();
  // const title = msg.get(appTitleKey);
  const { user } = useSelector(userState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  const title = "My Burgers App";
  return (
    <NavBar>
      <img
        src={burgerImage}
        alt="Burger"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
      <div style={{ width: "50%", float: "left", textAlign: "left" }}>
        <NuvoAppBarTitle>{title}</NuvoAppBarTitle>
      </div>
      <div style={{ width: "50%", float: "left", textAlign: "right" }}>
        <span>{user?.name}</span>
        {user?.wallets.map((wallet, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <span key={index}>
            {` | ${(Math.round(wallet.balance * 100) / 100).toFixed(2)} ${
              wallet.currency
            }`}
          </span>
        ))}
      </div>
    </NavBar>
  );
};

const AppBar = (): JSX.Element => {
  return <NuvoAppBar width="100%" appBar={<TopLevel />} />;
};

export { AppBar };
