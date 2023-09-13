import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IItemScroll {
  itemName: string | null;
}
const initialState: IItemScroll = {
  itemName: null,
};
const ItemScrollSlice = createSlice({
  name: "itemScroll",
  initialState: initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.itemName = action.payload;
    },
  },
});

export const { setName } = ItemScrollSlice.actions;
export default ItemScrollSlice;
