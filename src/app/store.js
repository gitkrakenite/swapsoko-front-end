import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/favorites/favoriteSlice";
// import unitReducer from "../features/units/unitSlice";
// import tenantReducer from "../features/tenant/tenantSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    // units: unitReducer,
    // tenant: tenantReducer,
  },
});
