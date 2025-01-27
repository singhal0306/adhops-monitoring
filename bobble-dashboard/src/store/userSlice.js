import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    loginSuccess: null,
    loginFails: false,
    success: null,
    error: null,
    user: {},
  },
  reducers: {
    loginRequest(state) {
      state.loading = true;
    },
    setLoadingFalse(state) {
      state.loading = false;
      state.loginSuccess = false;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.loginSuccess = true;
      state.loginFails = false;
      state.success = action.payload;
    },
    loginFails(state, action) {
      state.loading = false;
      state.loginSuccess = false;
      state.loginFails = true;
      state.error = action.payload;
    },
    userInfo(state, action) {
      state.loading = false;
      state.loginSuccess = true;
      state.user = action.payload;
    //   console.log(action.payload)
    },
    logOut(state){
        state.loginSuccess = null
    }
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
