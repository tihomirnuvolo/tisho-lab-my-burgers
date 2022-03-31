import * as Http from "src/utils/http";
import { setBurgers } from "src/store/burgersSlice";
import { Burger } from "src/types/Burger";

type Dispatch = (arg0: { payload: undefined; type: string }) => string | number;

const getBurgers = () => (dispatch: Dispatch) => {
  Http.get("/api/x_nuvo_my_burgers/burgers/getAll")
    .then((response) => {
      dispatch(setBurgers(JSON.parse(response.data.result)));
    })
    .catch((error) => {
      console.warn("Error while fetching burgers: ", error);
    });
};

const addBurger = (burger: Burger) => {
  Http.post("/api/x_nuvo_my_burgers/burgers/addBurger", burger)
    .then(() => {
      addBurger(burger);
    })
    .catch((error) => {
      console.warn("Error while adding a new burger: ", error);
    });
};

const updateBurger = (burger: Burger) => {
  Http.put("/api/x_nuvo_my_burgers/burgers/updateBurger", burger)
    .then(() => {
      updateBurger(burger);
    })
    .catch((error) => {
      console.warn("Error while updating an existing burger: ", error);
    });
};

export { getBurgers, addBurger, updateBurger };
