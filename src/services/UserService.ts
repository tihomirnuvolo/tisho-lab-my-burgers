import * as Http from "src/utils/http";
import { setUserDetails } from "src/store/userSlice";

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

export { getUserDetails };
