import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
      state.cartTotalQuantity = state.cartItems.reduce(
        (acc, item) => acc + item.cartQuantity,
        0
      );
      state.cartTotalAmount = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.cartQuantity,
        0
      );
    },

    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex >= 0) {
        state.cartItems.splice(itemIndex, 1);
      }
      state.cartTotalQuantity = Math.abs(
        state.cartItems.reduce((acc, item) => acc - item.cartQuantity, 0)
      );
      state.cartTotalAmount = Math.abs(
        state.cartItems.reduce(
          (acc, item) => acc - item.price * item.cartQuantity,
          0
        )
      );
    },
    increaseQuantity: (state, action) => {
      console.log(
        "Increase quantity action dispatched for item ID:",
        action.payload
      );
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex >= 0) {
        console.log("Item found at index", itemIndex);
        state.cartItems[itemIndex].cartQuantity += 1;
        console.log("New quantity:", state.cartItems[itemIndex].cartQuantity);
      }
      state.cartTotalQuantity = state.cartItems.reduce(
        (acc, item) => acc + item.cartQuantity,
        0
      );
      state.cartTotalAmount = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.cartQuantity,
        0
      );
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex >= 0 && state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      }
      state.cartTotalQuantity = Math.abs(
        state.cartItems.reduce((acc, item) => acc - item.cartQuantity, 0)
      );
      state.cartTotalAmount = Math.abs(
        state.cartItems.reduce(
          (acc, item) => acc - item.price * item.cartQuantity,
          0
        )
      );
    },

    resetCart: (state, action) => {
      (state.cartItems = []), (state.cartTotalQuantity = 0);
      state.cartTotalAmount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
