import React from "react";
import { Drawer } from "antd";
import { AiFillHome } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { BiExit, BiSolidUser } from "react-icons/bi";
import { useRouter } from "next/navigation";
type Props = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

function LoginModal({ isOpen, setIsOpen }: Props) {
  const router = useRouter();
  return (
    <Drawer
      title="Menu"
      onClose={() => setIsOpen(false)}
      placement="right"
      open={isOpen}
    >
      <div className=" mt-10 flex flex-col justify-center items-center">
        <div className="flex items-center mb-[50px]">
          <img
            src="/img/logo.png"
            className="w-[100px] object-cover"
            alt="logo"
          />
          <p className=" text-headingColor text-xl font-bold text-[28px]">
            Food
            <br />
            App
          </p>
        </div>
        <div
          className=" border-y-[0.3px] border-b-0 border-y-solid border-y-[#ccc] w-full py-[10px] flex items-center justify-start gap-[20px] cursor-pointer"
          onClick={() => router.push("/")}
        >
          <AiFillHome />
          Home
        </div>
        <div
          className=" border-y-[0.3px] border-b-0 border-y-solid border-y-[#ccc] w-full py-[10px] flex items-center justify-start gap-[20px] cursor-pointer"
          onClick={() => router.push("/infor")}
        >
          <BiSolidUser />
          infor
        </div>
        <div
          className=" border-y-[0.3px] border-y-solid border-y-[#ccc] w-full py-[10px] flex items-center justify-start gap-[20px] text-cartNumBg cursor-pointer"
          onClick={() => signOut()}
        >
          <BiExit />
          Log out
        </div>
      </div>
    </Drawer>
  );
}

export default LoginModal;
