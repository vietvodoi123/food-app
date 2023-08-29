import { formatNumberWithCommas } from "@/app/function/transform";
import { addDishes } from "@/redux/slice/CartSlice";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { MdShoppingBasket } from "react-icons/md";
import { useDispatch } from "react-redux";

type Props = {
  item: IDish;
};

function FruitsItem({ item }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const addToCart = () => {
    const dish: ICartItem = { ...item, count: 1 };
    console.log(dish);
    notification.success({
      message: "Thêm sản phẩm thành công",
      description: (
        <div
          className="flex justify-start items-center gap-[10px] cursor-pointer"
          onClick={() => router.push("/shop-cart")}
        >
          <p>Đi đến giỏ hàng</p> <BsArrowRight />
        </div>
      ),
      placement: "bottomRight",
    });
    dispatch(addDishes(dish));
  };
  return (
    <div
      onClick={addToCart}
      className="animate-[fade-in_1s_ease-in-out] bg-gray rounded-md relative h-[120px] ss:h-[140px] lg:h-[160px] p-[10px] sm:p-[15px] hover:drop-shadow-xl hover:cursor-pointer hover:bg-gray2"
    >
      <img
        src={item.image}
        alt={item.name}
        className=" absolute w-[70px] ss:w-[45%] top-[-10px] left-[15px] ss:top-[-40px] ss:left-[20px]"
      />
      <span className=" absolute top-[20px] right-[15px] bg-cartNumBg rounded-full p-1 ss:p-2">
        <MdShoppingBasket className="text-[10px] ss:text-[12px] md:text-[14px] lg:text-[16px] text-white" />
      </span>
      <div className=" flex flex-col justify-end h-full items-end font-semibold">
        <h1 className="text-[14px] ss:text-[16px]  md:text-[18px] lg:text-[20px] xl:text-[22px]">
          {item.name}
        </h1>
        <p className="text-[10px] md:text-[12px] lg:text-[14px] text-textColor font-medium">
          Lượt mua: {item.purches}
        </p>
        <p className="text-[12px] md:text-[14px] lg:text-[16px] text-cartNumBg">
          {formatNumberWithCommas(item.price)} Vnđ
        </p>
      </div>
    </div>
  );
}

export default FruitsItem;
