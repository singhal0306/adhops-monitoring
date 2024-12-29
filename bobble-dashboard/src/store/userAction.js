import { userAction } from "./userSlice";
import axios from "axios";

export const userLogin = (user) => {
  return async (dispatch) => {
    dispatch(userAction.loginRequest());
    try {
      const response = await axios.post("/api/user/login", user);
        // console.log(response.data.message);
      dispatch(userAction.loginSuccess(response.data.message));
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(userAction.loginFails(error.response.data.message));
    }
  };
};

export const getUser = () => {
  return async (dispatch) => {
    dispatch(userAction.loginRequest());
    try {
      const response = await axios.get("/api/user/getuser");
      if (response.data.message === "invalid signature") {
        // dispatch(userAction.loginFails(response.data.message))
        return;
      }
      dispatch(userAction.userInfo(response.data));
    } catch (error) {
      const message = error.response.data.message;
      if (message !== "Not Authorized" && message !== "invalid signature") {
        dispatch(userAction.loginFails(error.response.data.message));
      } else {
        dispatch(userAction.setLoadingFalse());
      }
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.get("/api/user/logout");
    } catch (error) {}
  };
};
