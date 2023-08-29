import React from "react";
import { Drawer } from "antd";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useSession, signIn, signOut } from "next-auth/react";
type Props = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

function LoginModal({ isOpen, setIsOpen }: Props) {
  return (
    <Drawer
      title="Login"
      onClose={() => setIsOpen(false)}
      placement="right"
      open={isOpen}
    >
      <div className=" mt-10 flex flex-col justify-center items-center">
        <div className="flex items-center mb-5">
          <img
            src="/img/logo.png"
            className="w-[100px] object-cover"
            alt="logo"
          />
          <p className=" text-headingColor text-xl font-bold text-[28px]">
            Food App
          </p>
        </div>
        <div className="flex justify-center items-center border-[1px] border-solid border-slate-600 p-5 rounded-xl hover:cursor-pointer w-full">
          <AiFillFacebook className="text-[24px] text-facebook" />
          <p className=" ml-3 font-500">Đăng nhập với Facebook</p>
        </div>
        <div
          onClick={() => signIn()}
          className="flex justify-center items-center border-[1px] border-solid border-slate-600 p-5 rounded-xl mt-4 hover:cursor-pointer w-full"
        >
          <FcGoogle className="text-[24px]" />
          <p className=" ml-3 font-500">Đăng nhập với Google</p>
        </div>
      </div>
    </Drawer>
  );
}

export default LoginModal;
