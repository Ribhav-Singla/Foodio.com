import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: localStorage.getItem('user') || '', // Load user from localStorage
};

export const NavbarSlice = createSlice({
    name: "Navbar",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', action.payload); // Save user to localStorage
        }
    }
});

export const { setUser } = NavbarSlice.actions;

export default NavbarSlice.reducer;
