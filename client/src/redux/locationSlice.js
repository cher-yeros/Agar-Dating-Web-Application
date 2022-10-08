import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    longitude: 0.0,
    latitude: 0.0,
  },
  reducers: {
    update: (state, action) => {
      state.longitude = action.payload.longitude;
      state.latitude = action.payload.latitude;
    },
  },
});

export const { update } = locationSlice.actions;
export default locationSlice.reducer;
