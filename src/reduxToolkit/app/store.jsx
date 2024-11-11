import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productReducer from "../features/productList/ProductSlice";
import cartReducer from "../features/productList/CartSlice";
import wishlistReducer from "../features/productList/WishListSlice";
import billingAddressReducer from "../features/productList/BillingSlice";
import sellerReducer from "../features/sellerSlice";
import customerReducer from "../features/customerSlice";
import adminReducer from "../features/adminSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

// Persistence configuration for each reducer
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ['isLoggedIn', 'user'],
};

const productPersistConfig = {
  key: "product",
  storage,
  whitelist: ['products'], // Persist only products (example)
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ['items', 'totalAmount'], // Example of persisting only certain parts of the cart
};

// Wrapping reducers with persistReducer
const persistAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistProductReducer = persistReducer(productPersistConfig, productReducer);
const persistCartReducer = persistReducer(cartPersistConfig, cartReducer);

// Configure store
const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
    product: persistProductReducer,
    cart: persistCartReducer,
    wishlist: wishlistReducer,
    billingAddress: billingAddressReducer,
    seller: sellerReducer,
    customer: customerReducer,
    admin: adminReducer,
  },
});

export const persistor = persistStore(store);
export default store;


