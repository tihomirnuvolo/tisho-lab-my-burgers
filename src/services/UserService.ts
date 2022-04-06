import * as Http from "src/utils/http";
import {
  addWalletRecord,
  setUserDetails,
  updateWalletRecord,
} from "src/store/userSlice";
import { Wallet } from "src/types/Wallet";

type Dispatch = (arg0: { payload: undefined; type: string }) => string | number;

const getUserDetails = () => (dispatch: Dispatch) => {
  dispatch(setUserDetails(undefined)); // do it to improve loading handling
  Http.get("/api/x_nuvo_my_burgers/burgers/getUserDetails")
    .then((response) => {
      dispatch(setUserDetails(response.data.result));
    })
    .catch((error) => {
      console.warn("Error while fetching user details: ", error);
    });
};

const addWallet = (
  wallet: Wallet,
  resolveHandler: Function,
  errorHandler: Function
): Promise<any> => {
  return Http.post("/api/x_nuvo_my_burgers/burgers/addWallet", wallet)
    .then((response) => {
      addWalletRecord(wallet);
      resolveHandler(response);
    })
    .catch((error) => {
      console.warn("Error while adding a new wallet: ", error);
      errorHandler(error);
    });
};

const updateWallet = (
  wallet: Wallet,
  resolveHandler: Function,
  errorHandler: Function
): Promise<any> => {
  return Http.put("/api/x_nuvo_my_burgers/burgers/updateWallet", wallet)
    .then((response) => {
      updateWalletRecord(wallet);
      resolveHandler(response);
    })
    .catch((error) => {
      console.warn("Error while updating an existing wallet: ", error);
      errorHandler(error);
    });
};

export { getUserDetails, addWallet, updateWallet };
