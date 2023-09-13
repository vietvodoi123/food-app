"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type Props = {};

function HeaderInfor({}: Props) {
  const { data: session } = useSession();
  return (
    <div className="mb-[30px] md:mb-[50px]">
      <h1 className=" font-semibold text-[18px] md:text-[20px] mb-[15px] md:mb-[30px]">
        Thông tin tài khoản
      </h1>
      <div className="flex justify-start items-center flex-col ssl:flex-row  gap-[20px] border-[0.3px] border-solid border-blue p-[10px] ssl:p-[20px] rounded-md">
        <LazyLoadImage
          effect="blur"
          src={session?.user?.image ? session.user.image : "/img/avatar.png"}
          className=" rounded-full w-[50px] ssl:w-[60px] md:w-[100px]"
        />
        <div className=" text-[12px] ssl:text-[14px] md:text-[16px]">
          <div className="flex justify-between items-center gap-[10px]">
            <span>Email:</span>
            <span>{session?.user?.email}</span>
          </div>
          <div className="flex justify-between items-center gap-[10px]">
            <span>Name:</span>
            <span>{session?.user?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderInfor;
