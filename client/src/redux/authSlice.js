import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedUser: null,
    pending: false,
    error: false,
    loggedIn: false,
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
      state.loggedIn = true;
    },
    logoutUser: (state, action) => {
      state.loggedUser = null;
      state.loggedIn = false;
    },
    updateAvatar: (state, action) => {
      console.log(action.payload);
      state.loggedUser.avatar = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logoutUser,
  processError,
  processStart,
  updateAvatar,
} = authSlice.actions;
export default authSlice.reducer;
