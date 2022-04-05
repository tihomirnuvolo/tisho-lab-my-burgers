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
  },
});

export const { setUserDetails } = userSlice.actions;

export const userState = (state: any): UserState => state.user;

export { userSlice };
