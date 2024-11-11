import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
}

export const WishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
            addToWishList: (state, action) => {
                const { product, quantity } = action.payload;
                const existingItemIndex = state.items.findIndex((item) => item.product._id === product._id);

                if (existingItemIndex !== -1) {
                    state.items.splice(existingItemIndex, 1);
                    state.toastMessage = { text: 'Item removed from wishlist', type: 'removed' };
                } else {
                    state.items.push({ product, quantity, color: 'true' });
                    state.toastMessage = { text: 'Item added to wishlist', type: 'added' };
                }
            },
        clearToastMessage: state => {
            state.toastMessage = null;
        },
        
        removeFromWishList: (state, action) => {
            state.items = state.items.filter(item => item.product._id !== action.payload);
        },
    }
})

export const { addToWishList, clearToastMessage, removeFromWishList } = WishListSlice.actions;
export default WishListSlice.reducer;