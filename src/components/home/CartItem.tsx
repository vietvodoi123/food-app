import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  decrementDish,
  incrementDish,
  removeDishes,
} from "@/redux/slice/CartSlice";
import { formatNumberWithCommas } from "@/app/function/transform";
import { ICartItem } from "../../../types";
type Props = {
  item: ICartItem;
};

function CartItem({ item }: Props) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(item.count);
  return (
    <div className="flex justify-between items-center shadow-md w-full p-[10px] ss:p-[20px]">
      <div className="flex justify-between items-center gap-[5px] lg:gap-[20px] flex-col lg:flex-row">
        <img
          src={item.image}
          alt={item.name}
          className="h-[50px] ss:h-[80px]"
        />
        <p className="text-[14px] font-semibold">{item.name}</p>
      </div>
      <div className="flex justify-between items-center gap-[10px] lg:gap-[20px]">
        <div className="text-[14px] ss:text-[16px] flex justify-between items-center gap-[5px] ">
          <AiOutlineMinusCircle
            className="hover:cursor-pointer text-[16px]"
            onClick={() => {
              setCount(count - 1);
              dispatch(decrementDish(item));
            }}
          />
          {count}
          <AiOutlinePlusCircle
            className="hover:cursor-pointer text-[16px]"
            onClick={() => {
              setCount(count + 1);
              dispatch(incrementDish(item));
            }}
          />
        </div>
        <p className="text-[14px] ss:text-[16px] font-semibold">
          {formatNumberWithCommas(item.price * count)} vnđ
        </p>
        <RiDeleteBin5Line
          className="hidden lg:block hover:cursor-pointer hover:text-red1"
          onClick={() => dispatch(removeDishes(item))}
        />
      </div>
    </div>
  );
}

export default CartItem;
