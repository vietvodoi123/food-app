"use client";
import { Empty } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { BiArrowBack, BiCartAlt } from "react-icons/bi";
import { IRootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import CartItem from "@/components/home/CartItem";

import DetailBill from "@/components/shop-cart/DetailBill";

function ShopCart() {
  const router = useRouter();
  const cartList = useSelector((state: IRootState) => state.cart.cartList);

  return (
    <div className="pt-[80px] ss:pt-[90px] px-5 md:px-16 mb-[50px]">
      <div className="mx-auto p-[15px] ssl:p-[20px] lg:p-[30px] lg:w-full xl:w-[70%] border-textColor border-[0.5px] border-[solid] grid-cols-1 grid md:grid-cols-[1.5fr_1fr] gap-[30px] rounded-[20px]">
        <div>
          <span className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold pb-[20px] flex gap-[20px] items-center relative after:contents=[''] after:bg-textColor after:absolute after:left-0 after:right-0 after:bottom-[10px] after:w-[100%] after:h-[1px]">
            <BiArrowBack
              className=" cursor-pointer"
              onClick={() => router.replace("/")}
            />
            <h1>Tiếp Tục Mua Sắm</h1>
          </span>
          <div className="flex justify-between items-center py-[10px] ss:py-[15px]">
            <h1 className="flex justify-center items-center gap-[10px] text-[14px]">
              <BiCartAlt className="text-[24px]" />
              <p className=" hidden ssl:block">Giỏ Hàng</p>
            </h1>
            <p className=" text-[12px] ss:text-[14px]">
              Bạn có {cartList ? cartList.length : 0} sản phẩm trong giỏ
            </p>
          </div>
          <div className="h-full flex justify-center items-start">
            {cartList.length === 0 ? (
              <Empty />
            ) : (
              <div className="w-full flex flex-col items-center justify-center gap-[20px]">
                {cartList.map((item) => (
                  <CartItem item={item} key={item.id} />
                ))}
              </div>
            )}
          </div>
        </div>
        <DetailBill />
      </div>
    </div>
  );
}

export default ShopCart;
