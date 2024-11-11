import { createSlice } from "@reduxjs/toolkit";
import { FaLessThanEqual } from "react-icons/fa";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    //latest change
    isLoggedIn: false,
    user: null,

    signin: false,
    currentUser: {},
    token: "",
    productCategory: [],
    orderCreate: false,
  },
  reducers: {
    login: (state, action) =>{
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    signIn: (state, action) => {
      state.signin = true;
      state.token = action.payload;
    },
    signUp: (state, action) => {
      console.log("sign up ", action.payload);
    },
    currentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    signout: (state, action) => {
      state.signin = false;
      state.currentUser = {};
      localStorage.removeItem("jwttoken");
      state.token = "";
    },
    updateAddress: (state, action) => {
      const { address } = state.currentUser;
      address.push(action.payload);
    },
    updateCategory: (state, action) => {
      state.productCategory = action.payload;
    },
    addNewCategory: (state, action) => {
      state.productCategory.push(action.payload);
    },
    orderSuccess: (state, action) => {
      state.orderCreate = action.payload;
    },
  },
});

export const {
  login,
  logout,
  signIn,
  signUp,
  currentUser,
  signout,
  updateAddress,
  updateCategory,
  addNewCategory,
  orderSuccess,
} = authSlice.actions;
export default authSlice.reducer;
