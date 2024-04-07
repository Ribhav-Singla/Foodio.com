import { configureStore } from '@reduxjs/toolkit'
import NavbarSlice from '../features/Navbar/NavbarSlice'

export const store = configureStore({
  reducer: {
    Navbar : NavbarSlice
  },
})