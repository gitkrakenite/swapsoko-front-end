import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, { rejectWithValue, getState }) => {
    try {
      const cartItems = getState().cart.cart;

      // Check if the product already exists in the cart
      const isProductInCart = cartItems.some(
        (item) => item._id === product._id
      );

      if (isProductInCart) {
        return cartItems; // Return the existing cart items without adding the duplicate product
      }

      const updatedCart = [...cartItems, product];

      // Simulate a delay to mimic an asynchronous operation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return updatedCart;
    } catch (error) {
      return rejectWithValue("Failed to add item to cart");
    }
  }
);

export const removeFromCart = createAction("cart/removeFromCart");

const initialState = {
  cart: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeFromCart, (state, action) => {
        const productId = action.payload;
        const index = state.cart.findIndex((item) => item._id === productId);
        if (index !== -1) {
          state.cart.splice(index, 1);
        }
      });
  },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;
