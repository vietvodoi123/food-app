import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/CartSlice";
import { getJSDocReturnType } from "typescript";
import ItemScrollSlice from "./slice/ItemScroll";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    itemScroll: ItemScrollSlice.reducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
export default store;
