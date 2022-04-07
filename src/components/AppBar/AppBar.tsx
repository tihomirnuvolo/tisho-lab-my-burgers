import React, { useEffect } from "react";
import styled from "styled-components";
import { NuvoAppBar } from "@nuvolo/nuux/components/NuvoAppBar";
import { NuvoAppBarTitle } from "@nuvolo/nuux/components/NuvoAppBarTitle";
import burgerImage from "src/assets/burger.png";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "src/store/userSlice";
import { getUserDetails } from "src/services/UserService";
import { Link } from "react-router-dom";
import { useNuvoMessages } from "@nuvolo/nuux/hooks";
import { getMessage } from "@utils/messages";

export const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
`;

const TopLevel = (): JSX.Element => {
  const msg = useNuvoMessages();
  const { user } = useSelector(userState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  return (
    <NavBar>
      <div
        style={{
          width: "50%",
          height: "100%",
          float: "left",
          textAlign: "left",
        }}
      >
        <Link to="/">
          <img
            src={burgerImage}
            alt="Burger"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
          <div style={{ display: "inline-block" }}>
            <NuvoAppBarTitle>{getMessage(msg, "MB_TITLE")}</NuvoAppBarTitle>
          </div>
        </Link>
      </div>
      <div style={{ width: "50%", float: "left", textAlign: "right" }}>
        <Link to="/user">
          <span>{user?.name}</span>
          {user?.wallets.map((wallet, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={index}>
              {` | ${(Math.round(wallet.balance * 100) / 100).toFixed(2)} ${
                wallet.currency
              }`}
            </span>
          ))}
        </Link>
      </div>
    </NavBar>
  );
};

const AppBar = (): JSX.Element => {
  return <NuvoAppBar width="100%" appBar={<TopLevel />} />;
};

export { AppBar };
