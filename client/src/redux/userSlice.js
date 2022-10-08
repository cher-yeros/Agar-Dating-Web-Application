import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedUser: {
      firstname: "",
      lastname: "",
      avatar: "",
      gender: "",
      username: "",
    },
    pending: false,
    error: false,
  },
  reducers: {
    processStart(state, action) {
      state.pending = true;
    },
    processError(state, action) {
      state.error = true;
    },
    loginSuccess: (state, action) => {
      state.loggedUser = action.payload;
      state.pending = false;
      state.error = false;
    },
    logoutUser: (state, action) => {
      state.loggedUser = {};
    },
  },
});

export const {
  loginSuccess,
  logoutUser,
  processError,
  processStart,
} = userSlice.actions;
export default userSlice.reducer;
