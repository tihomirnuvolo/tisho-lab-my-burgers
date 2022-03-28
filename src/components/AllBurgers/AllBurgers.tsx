import React from "react";
import { useSelector } from "react-redux";
import { burgersState } from "src/store/burgersSlice";

export const AllBurgers = (): JSX.Element => {
  const { burgers } = useSelector(burgersState);
  console.dir(burgers);
  return <h1>All Burgers</h1>;
};
