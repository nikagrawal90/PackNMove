import { configureStore } from "@reduxjs/toolkit";
import plansReducer from "./slices/planSlice";
import userReducer from "./slices/userSlice";
// import { authMiddleware } from "../auth/middleware";
// import thunk from 'redux-thunk'

export default configureStore({
    reducer: {
        plan: plansReducer, 
        user: userReducer
    }
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});
