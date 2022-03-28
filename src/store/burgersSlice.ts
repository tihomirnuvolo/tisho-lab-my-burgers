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
      state.burgers = action.payload;
    },
  },
});

export const { setBurgers } = burgersSlice.actions;

export const burgersState = (state: any): BurgerState => state.burgers;

export { burgersSlice };
