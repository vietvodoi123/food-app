import { formatNumberWithCommas } from "@/app/function/transform";
import React from "react";

type Props = {
  item: IDish;
};

function FoodItem({ item }: Props) {
  return (
    <div className="animate-[fade-in_1s_ease-in-out] relative w-full h-[120px] sm:h-[150px] md:h-[180px] lg:h-[220px] bg-orange drop-shadow-md rounded-[30px] p-[10px] sm:p-[20px] hover:drop-shadow-xl">
      <img
        src={item.image}
        className=" absolute top-[-50px] w-[110px] md:w-[130px] lg:w-[165px] left-[50%] translate-x-[-50%] hover:drop-shadow-2xl"
      />
      <div className="flex flex-col justify-end h-full items-center font-semibold text-center">
        <h1 className="text-[12px] sm:text-[14px] md:text-[18px] lg:text-[20px] xl:text-[26px]">
          {item.name}
        </h1>
        <span className="text-[10px] md:text-[12px] lg:text-[14px] text-textColor">
          Lượt mua: {item.purches}
        </span>
        <p className="text-[12px] md:text-[14px] lg:text-[16px] text-cartNumBg">
          {formatNumberWithCommas(item.price)} Vnđ
        </p>
      </div>
    </div>
  );
}

export default FoodItem;
