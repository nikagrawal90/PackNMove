import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../../auth/auth";
import { setSession } from "../../auth/auth";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        error: false
    },
    reducers: {
        login: (state, action) => {
            const token = action.payload.token;
            const user = action.payload.user;
            state.user = user;
            setSession(user, token);
        },
        setUser: (state, action) => {
            const user = action.payload;
            state.user = user;
        },
        logout: (state, action) => {
            logoutUser();
            state.user = null;
        },
        updateCart: (state, action) => {
            const cart = action.payload;
            state.user.cart = cart;
        }
    }
})

export const {login, setUser, logout, updateCart} = userSlice.actions;
export const getUser = (state) => state.user.user;
export default userSlice.reducer;