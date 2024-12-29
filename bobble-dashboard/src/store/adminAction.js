import { adminAction } from "./adminSlice";
import axios from "axios";

export const addUser = (user) => {
  return async (dispatch) => {
    dispatch(adminAction.request());
    try {
      const response = await axios.post("/api/user/register", user);
      dispatch(adminAction.addUserSuccess(response.data.message));
    } catch (error) {
      dispatch(adminAction.addUserFails(error.response.data.message));
    }
  };
};

export const listUsers = () => {
  return async (dispatch) => {
    dispatch(adminAction.request());
    try {
      const response = await axios.get("/api/user/listUser");
      dispatch(adminAction.listUser(response.data));
    } catch (error) {
      dispatch(adminAction.addUserFails("List user Failed"));
    }
  };
};
