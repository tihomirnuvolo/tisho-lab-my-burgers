import { createSlice } from "@reduxjs/toolkit";
import { UserDetails } from "src/types/UserDetails";

interface UserState {
  user?: UserDetails;
}

const userDefaults: UserState = {
  user: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState: userDefaults,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
    addWalletRecord: (state, action) => {
      state.user = {
        user_sys_id: state.user?.user_sys_id ?? "",
        name: state.user?.name ?? "",
        wallets: state.user?.wallets?.concat(action.payload) ?? [],
      };
    },
    updateWalletRecord: (state, action) => {
      state.user = {
        user_sys_id: state.user?.user_sys_id ?? "",
        name: state.user?.name ?? "",
        wallets:
          state.user?.wallets?.map((wallet) =>
            wallet.sys_id === action.payload.sys_id ? action.payload : wallet
          ) ?? [],
      };
    },
  },
});

export const { setUserDetails, addWalletRecord, updateWalletRecord } =
  userSlice.actions;

export const userState = (state: any): UserState => state.user;

export { userSlice };
