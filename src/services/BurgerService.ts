import * as Http from "src/utils/http";
import { setBurgers } from "src/store/burgersSlice";

type Dispatch = (arg0: { payload: undefined; type: string }) => string | number;

const getBurgers = () => (dispatch: Dispatch) => {
  Http.get(
    "https://ven04287.service-now.com/api/x_nuvo_my_burgers/burgers/getAll"
  )
    .then((response) => {
      dispatch(setBurgers(JSON.parse(response.data.result)));
    })
    .catch((error) => {
      console.warn("Error while fetching burgers ", error);
    });
};

export { getBurgers };
