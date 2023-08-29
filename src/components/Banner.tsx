import { Button } from "antd";
import React from "react";
import { MdDeliveryDining } from "react-icons/md";
type Props = {};

function Banner({}: Props) {
  return (
    <div className="w-full pt-[10px]">
      <div className="p-2 w-max text-[10px] sm:text-[12px] lg:text-[14px] font-semibold flex items-center bg-delivery justify-center text-textDelivery rounded-full gap-2 mb-6">
        Bike Delivery
        <img
          src="/img/delivery.png"
          className="bg-white p-1 rounded-full w-[20px] sm:w-[25px] md:w-[30px]"
        />
      </div>
      <h1 className=" text-[26px] sm:text-[36px] md:text-[40px] lg:text-[48px] xl:text-[62px] leading-relaxed font-semibold mb-6">
        The Fastest
        <br /> Delivery in{" "}
        <span className="text-textDelivery">
          Your <br />
          City
        </span>
      </h1>
      <p className="mb-6 text-[12px] sm:text-[14px] md:text-[16px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
        facilis, numquam tempora omnis quia ea pariatur sunt rem quas
        asperiores, molestias velit consectetur impedit quaerat placeat sit
        possimus animi officia.
      </p>
      <Button
        size="large"
        shape="round"
        className=" bg-textDelivery text-white text-[12px] sm:text-[14px] md:text-[16px]"
      >
        Order Now
      </Button>
    </div>
  );
}

export default Banner;
