import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


import axiosInstance from "../../../components/newUpdateComponents/axiosInstance";

const initialState = {
  loading: false,
  products: [],
  filterProducts: [],
  orders: [],
  error: "",
  status: "idle",
  categories: [],
  payment: null,
};



export const fetchProducts = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const res = await axiosInstance.get('/api/users/products')
    console.log("fechproduct slice: ", res.data.data);
    return res.data.data;
  }
);

export const fetchCategories = createAsyncThunk(
  "categories/fetchProducts",
  async() =>{
    const res = await axiosInstance.get('/api/users/category')
    console.log("Category asyncThunk: ", res.data.category);
    return res.data.category
  }
)

export const postOrder = createAsyncThunk(
  "order/postOrder",
  async(values) => {
    console.log("values: ", values)
    const res = await axiosInstance.post("/api/payment/order", values)
    // console.log("order slice: ", res.data.data)
    return res.data.data
  }
)

export const verifyPayment = createAsyncThunk(
  'payment/verifyPayment',
  async (paymentDetails, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/payment/verify", paymentDetails)
       console.log("payment slice: ", response.data.data)
      return response.data;  // Return the response data from the backend
    } catch (error) {
      return rejectWithValue(error.response.data);  // Return error if request fails
    }
  }
);

// get('https://dummyjson.com/products')

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    searchAndFilter: (state, action) => {
      const { term, price, sort, category } = action.payload;

      let filteredProducts = [...state.products];

      if (term) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );
      }

      if (category.length > 0) { // Check if any category is selected
        filteredProducts = filteredProducts.filter(product => category.includes(product.category.name));
    }

      // Apply price filter (if selected)
      switch (price) {
        case "below":
          filteredProducts = filteredProducts.filter(
            (product) => product.price < 300
          );
          break;
        case "between":
          filteredProducts = filteredProducts.filter(
            (product) => product.price >= 300 && product.price <= 1000
          );
          break;
        case "above":
          filteredProducts = filteredProducts.filter(
            (product) => product.price > 1000
          );
          break;
        default:
          break; // No additional filtering if 'all' is selected
      }

      // Apply sorting (if selected)
      if (sort === "ascending") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sort === "descending") {
        filteredProducts.sort((a, b) => b.price - a.price);
      }
      state.filterProducts = filteredProducts;
    },
  },
  
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      (state.loading = false),
        (state.products = action.payload),
        (state.filterProducts = action.payload),
        (state.error = "");
      state.status = "succeeded";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      (state.loading = false),
        (state.products = []),
        (state.filterProducts = []),
        (state.error = action.error.message),
        (state.status = "failed");
    });
    builder
    .addCase(fetchCategories.pending, (state) =>{
      state.loading = true;
      state.status = "loading"
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload; // Store categories here
      state.error = "";
      state.status = "succeeded";
    })
    .addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.categories = [];
      state.error = action.error.message;
      state.status = "failed";
    });
    builder
      .addCase(postOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);  // Store the order in the orders array
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;  // Set the error message if the request fails
      });
       builder
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload;
        state.error = null;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { searchAndFilter } = ProductSlice.actions;
export default ProductSlice.reducer;
