import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem, IDish } from "../../../types";

interface ICart {
  cartList: ICartItem[];
  total: number;
}
const initialState: ICart = { cartList: [], total: 0 };

function calcTotal(cartList: ICartItem[]) {
  const priceList = cartList.map((item) => {
    return item.price * item.count;
  });
  const sum = priceList.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  return sum;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addDishes: (state, action: PayloadAction<ICartItem>) => {
      const index = state.cartList.filter(
        (item) => item.id === action.payload.id
      );

      if (index.length > 0) {
        state.cartList.map((item) => {
          if (item.id === action.payload.id) {
            item.count += 1;
          }
        });
      } else {
        state.cartList.push(action.payload);
      }
      state.total = calcTotal(state.cartList);
    },
    incrementDish: (state, action: PayloadAction<ICartItem>) => {
      const index = state.cartList.filter(
        (item) => item.id === action.payload.id
      );

      if (index.length > 0) {
        state.cartList.map((item) => {
          if (item.id === action.payload.id) {
            item.count += 1;
          }
        });
      } else {
        state.cartList.push(action.payload);
      }
      state.total = calcTotal(state.cartList);
    },
    decrementDish: (state, action: PayloadAction<ICartItem>) => {
      const index = state.cartList.filter(
        (item) => item.id === action.payload.id
      );

      if (index[0].count > 1) {
        state.cartList.map((item) => {
          if (item.id === action.payload.id) {
            item.count -= 1;
          }
        });
      } else {
        const cart = state.cartList.filter(
          (item) => item.id != action.payload.id
        );
        state.cartList = cart;
      }
      state.total = calcTotal(state.cartList);
    },
    removeDishes: (state, action: PayloadAction<ICartItem>) => {
      const cart = state.cartList.filter(
        (item) => item.id != action.payload.id
      );
      state.cartList = cart;
      state.total = calcTotal(state.cartList);
    },

    deleteAll: (state) => {
      state.cartList = [];
      state.total = 0;
    },
    addMoreDishes: (state, action: PayloadAction<ICartItem[]>) => {
      state.cartList = action.payload;
      state.total = calcTotal(action.payload);
    },
  },
});
export const {
  addMoreDishes,
  addDishes,
  incrementDish,
  decrementDish,
  removeDishes,
  deleteAll,
} = cartSlice.actions;
export default cartSlice;
