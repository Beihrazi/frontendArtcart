import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../components/newUpdateComponents/axiosInstance';

// Initial state
const initialState = {
  billingInfo: [],
  loading: false,
  error: null,
  success: false,
};

// Async thunk for adding billing info (with optimistic update)
export const insertBilling = createAsyncThunk(
  'billing/insertBilling',
  async (billingData, { rejectWithValue }) => {
    try {
      console.log("data: ", billingData);

      const modifiedBillingData = {
        address: [
          {
            street: billingData.street,
            city: billingData.city,
            landmark: billingData.landmark,
            locality: billingData.locality,
            pincode: billingData.pincode,
            state: billingData.state
          }
        ]
      };
      console.log("modifiedData: ", modifiedBillingData)
      
      // API call to persist billing data in the database
      const response = await axiosInstance.post('/api/users/billing', modifiedBillingData);
      console.log("billing slice: ", response.data);
      
      return response.data; // Return data on success for fulfilled action
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'An error occurred');
    }
  }
);


// Async thunk for updating billing info
export const updateBilling = createAsyncThunk(
  'billing/updateBilling',
  async (billingData, { rejectWithValue, dispatch }) => {
    try {
      console.log("billing data: ", billingData)
      // Optimistically update the state
      

      // Make the API request to update the database
      const response = await axiosInstance.put('/api/users/personalDetail', billingData);
      console.log("update billing: ", response.data)
      dispatch(updateBillingInfo(billingData));
      return response.data;
    } catch (error) {
      // Revert the state if the API request fails
      dispatch(revertBillingInfo(billingData));
      return rejectWithValue(error.response.data.msg || 'An error occurred');
    }
  }
);

export const fetchBillingData = createAsyncThunk(
    'billing/fetchBillingData', // action type
    async (thunkAPI) => {
      try {
        const response = await axiosInstance.get('/api/users/billing');
        // console.log("response: ", response.data.data)
        return response.data.data; // Return data to be used in reducer
       
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || 'An error occurred'); // Return error message
      }
    })

// Reducer slice
const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    addBillingInfo: (state, action) => {
      state.billingInfo.push(action.payload); // Add to state immediately
    },
    updateBillingInfo: (state, action) => {
      // Find the billing info to update and replace it with new data
      const index = state.billingInfo.findIndex(
        (billing) => billing._id === action.payload._id
      );
      if (index !== -1) {
        state.billingInfo[index] = action.payload;
      }
    },
    removeBillingInfo: (state, action) => {
      // Optimistically remove from state if the operation fails
      state.billingInfo = state.billingInfo.filter(
        (billing) => billing._id !== action.payload._id
      );
    },
    revertBillingInfo: (state, action) => {
      // Rollback state to its previous value (can be more complex depending on your needs)
    },
  },
  extraReducers: (builder) => {
    // Handle async actions' lifecycle (pending, fulfilled, rejected)
    builder
      .addCase(fetchBillingData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBillingData.fulfilled, (state, action) => {
        state.loading = false;
        state.billingInfo = action.payload; // Save the fetched data
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchBillingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error from the rejected API call
      });

    builder
      .addCase(insertBilling.pending, (state) => {
        state.loading = true;
      })
      .addCase(insertBilling.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.billingInfo = [...state.billingInfo, action.payload];
      })
      .addCase(insertBilling.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBilling.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBilling.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.billingInfo.findIndex(
          (billing) => billing._id === action.payload._id
        );
        if (index !== -1) {
          state.billingInfo[index] = action.payload;
        }
      })
      .addCase(updateBilling.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { addBillingInfo, updateBillingInfo, removeBillingInfo, revertBillingInfo } = billingSlice.actions;
export default billingSlice.reducer;
