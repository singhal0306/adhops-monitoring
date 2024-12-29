import { createSlice } from "@reduxjs/toolkit";

const mobAvenueSlice = createSlice({
  name: "mobAvenue",
  initialState: {
    loading: false,
    error: null,
    errorMessage: "",
    filterData: null,
    initialData: [],
    offerData: null
  },
  reducers: {
    dataRequest(state) {
      state.loading = true;
    },
    initialDataSuccess(state, action) {
      state.loading = false;
      state.error = false;
      state.initialData = action.payload;
    },
    dataSuccess(state, action) {
      state.loading = false;
      state.error = false;
      state.filterData = action.payload;
    },
    offerData(state, action){
        state.loading = false
        state.error = false
        state.offerData = action.payload
    },
    dataFails(state, action) {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
  },
});

export const mobAvenueAction = mobAvenueSlice.actions;
export default mobAvenueSlice.reducer;
