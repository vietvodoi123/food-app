"use client";
import HeaderInfor from "@/components/infor/HeaderInfor";
import MyBill from "@/components/infor/MyBill";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <div className="pt-[100px] mx-auto w-full px-5 md:w-[650px] md:px-0 lg:w-[1000px] ">
      <HeaderInfor />
      <MyBill />
    </div>
  );
}

export default page;
