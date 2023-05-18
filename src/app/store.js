import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
// import propertyReducer from "../features/property/propertySlice";
// import unitReducer from "../features/units/unitSlice";
// import tenantReducer from "../features/tenant/tenantSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // properties: propertyReducer,
    // units: unitReducer,
    // tenant: tenantReducer,
  },
});
