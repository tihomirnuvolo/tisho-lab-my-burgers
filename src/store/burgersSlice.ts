import { createSlice } from "@reduxjs/toolkit";
import { Burger } from "src/types/Burger";

interface BurgerState {
  burgers?: Burger[];
}

const burgerDefaults: BurgerState = {
  burgers: undefined,
};

const burgersSlice = createSlice({
  name: "burgers",
  initialState: burgerDefaults,
  reducers: {
    setBurgers: (state, action) => {
      // console.log("set burgers: ", action.payload);
      state.burgers = action.payload;
    },
    addBurgerRecord: (state, action) => {
      console.log("state create ", action.payload);
      state.burgers = state.burgers?.concat(action.payload);
    },
    updateBurgerRecord: (state, action) => {
      console.log("state update", action.payload);
      state.burgers = state.burgers?.map((burger) =>
        burger.sys_id === action.payload.sys_id ? action.payload : burger
      );
    },
  },
});

export const { setBurgers, addBurgerRecord, updateBurgerRecord } =
  burgersSlice.actions;

export const burgersState = (state: any): BurgerState => state.burgers;

export { burgersSlice };
