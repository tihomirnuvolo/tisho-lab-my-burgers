import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBurgers } from "src/services/BurgerService";
import { burgersState } from "src/store/burgersSlice";

export const AllBurgers = (): JSX.Element => {
  const { burgers } = useSelector(burgersState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBurgers());
  }, []);

  console.dir(burgers);
  return <h1>All Burgers</h1>;
};
