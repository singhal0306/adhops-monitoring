import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    success: false,
    error: false,
    message: "",
    isChange: false,
    listUsers: [],
  },
  reducers: {
    request(state) {
      state.loading = true;
    },
    listUser(state, action) {
      state.loading = false;
      state.listUsers = action.payload;
      console.log(action.payload);
    },
    addUserSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.isChange = true;
      state.message = action.payload;
    },
    addUserFails(state, action) {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = action.payload;
    },
  },
});

export const adminAction = adminSlice.actions;
export default adminSlice.reducer;
