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
type Props = {
  item: ICartItem;
};

function CartItem({ item }: Props) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(item.count);
  return (
    <div className="flex justify-between items-center shadow-md w-full p-[20px]">
      <div className="flex justify-between items-center gap-[20px]">
        <img src={item.image} alt={item.name} className=" h-[80px]" />
        <p className=" font-semibold">{item.name}</p>
      </div>
      <div className="flex justify-between items-center gap-[20px]">
        <div className="flex justify-between items-center gap-[10px]">
          <AiOutlineMinusCircle
            className="hover:cursor-pointer "
            onClick={() => {
              setCount(count - 1);
              dispatch(decrementDish(item));
            }}
          />
          {count}
          <AiOutlinePlusCircle
            className="hover:cursor-pointer "
            onClick={() => {
              setCount(count + 1);
              dispatch(incrementDish(item));
            }}
          />
        </div>
        <p className=" font-semibold">
          {formatNumberWithCommas(item.price)} vnđ
        </p>
        <RiDeleteBin5Line
          className="hover:cursor-pointer hover:text-red1"
          onClick={() => dispatch(removeDishes(item))}
        />
      </div>
    </div>
  );
}

export default CartItem;
