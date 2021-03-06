import * as Http from "src/utils/http";
import {
  addBurgerRecord,
  setBurgers,
  updateBurgerRecord,
} from "src/store/burgersSlice";
import { Burger } from "src/types/Burger";

type Dispatch = (arg0: { payload: undefined; type: string }) => string | number;

const getBurgers = () => (dispatch: Dispatch) => {
  dispatch(setBurgers(undefined)); // do it to improve loading handling
  Http.get("/api/x_nuvo_my_burgers/burgers/getAll")
    .then((response) => {
      dispatch(setBurgers(response.data.result));
    })
    .catch((error) => {
      console.warn("Error while fetching burgers: ", error);
    });
};

const addBurger = (
  burger: Burger,
  resolveHandler: Function,
  errorHandler: Function
): Promise<any> => {
  return Http.post("/api/x_nuvo_my_burgers/burgers/addBurger", burger)
    .then((response) => {
      addBurgerRecord(burger);
      resolveHandler(response);
    })
    .catch((error) => {
      console.warn("Error while adding a new burger: ", error);
      errorHandler(error);
    });
};

const updateBurger = (
  burger: Burger,
  resolveHandler: Function,
  errorHandler: Function
): Promise<any> => {
  return Http.put("/api/x_nuvo_my_burgers/burgers/updateBurger", burger)
    .then((response) => {
      updateBurgerRecord(burger);
      resolveHandler(response);
    })
    .catch((error) => {
      console.warn("Error while updating an existing burger: ", error);
      errorHandler(error);
    });
};

const buyBurger = (
  user_id: string,
  burger_id: string,
  resolveHandler: Function,
  errorHandler: Function
): Promise<any> => {
  return Http.put(
    `/api/x_nuvo_my_burgers/burgers/buyBurger?user_id=${user_id}&burger_id=${burger_id}`
  )
    .then((response) => {
      resolveHandler(response);
    })
    .catch((error) => {
      console.warn("Error while updating an existing burger: ", error);
      errorHandler(error);
    });
};

export { getBurgers, addBurger, updateBurger, buyBurger };
