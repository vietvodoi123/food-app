import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/CartSlice";
import { getJSDocReturnType } from "typescript";

const store = configureStore({ reducer: cartSlice.reducer });

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
export default store;
