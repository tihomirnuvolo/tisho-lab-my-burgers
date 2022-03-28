import * as Http from "src/utils/http";
import { setBurgers } from "src/store/burgersSlice";

type Dispatch = (arg0: { payload: undefined; type: string }) => string | number;

const getBurgers = () => (dispatch: Dispatch) => {
  Http.get("api/x_nuvo_my_burgers/my_burgers/all_burgers/getAll")
    .then((response) => {
      dispatch(setBurgers(JSON.parse(response.data.result)));
    })
    .catch((error) => {
      console.warn("Error while fetching burgers ", error);
    });
};

export { getBurgers };
