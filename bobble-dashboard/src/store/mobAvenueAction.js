import axios from "axios";
import { mobAvenueAction } from "./mobAvenueSlice";

export const initialData = () => {
  return async (dispatch) => {
    dispatch(mobAvenueAction.dataRequest());
    try {
      const response = await axios.get("/api/mobavenue/mobAvenueData");
      dispatch(mobAvenueAction.initialDataSuccess(response.data));
    } catch (error) {
      dispatch(mobAvenueAction.dataFails(error.response.data));
    }
  };
};

export const mobData = (dates) => {
  return async (dispatch) => {
    dispatch(mobAvenueAction.dataRequest());
    try {
      const response = await axios.post("/api/mobavenue/filterData", dates);
      dispatch(mobAvenueAction.dataSuccess(response.data));
    } catch (error) {
      dispatch(mobAvenueAction.dataFails(error.response.data));
    }
  };
};

export const surgexOfferData = () => {
  return async (dispatch) => {
    dispatch(mobAvenueAction.dataRequest());
    try {
        const response = await axios.get("/api/mobavenue/offerData")
        dispatch(mobAvenueAction.offerData(response.data))
    } catch (error) {
        dispatch(mobAvenueAction.dataFails(error.response.data))   
    }
  };
};
