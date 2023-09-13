"use client";
import { Button, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import LoginModal from "./modal/LoginModal";
import { useSession, signOut, signIn } from "next-auth/react";
import { BiSolidUser, BiLogOut } from "react-icons/bi";
import {
  doc,
  getFirestore,
  setDoc,
  collection,
  Firestore,
} from "firebase/firestore";
import app from "../app/share/firebaseConfig";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { useRouter } from "next/navigation";

type Props = {};

const Header = (props: Props) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const router = useRouter();

  const countCart = useSelector((state: IRootState) => state.cart.cartList);

  const isAuth = session ? true : false;

  const db: Firestore = getFirestore(app);
  const userRef = collection(db, "users");

  useEffect(() => {
    saveUser();
  }, [session]);

  async function saveUser() {
    if (session?.user) {
      const date = new Date();
      const id =
        date.getDate().toString().padStart(2, "0") +
        "-" +
        date.getMonth().toString().padStart(2, "0") +
        "-" +
        date.getFullYear() +
        " " +
        date.getHours().toString().padStart(2, "0") +
        ":" +
        date.getMinutes().toString().padStart(2, "0");
      await setDoc(doc(userRef, id), {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image,
      });
    }
  }
  const items = [
    {
      label: "info",
      key: "info",
      icon: <BiSolidUser />,
      onClick: () => {
        router.push("/infor");
      },
    },
    {
      label: "Log out",
      key: "logout",
      icon: <BiLogOut />,
      danger: true,
      onClick: () => {
        signOut();
      },
    },
  ];
  const avatarAndMenu = (
    <div className=" relative">
      <img
        onMouseEnter={() => setIsOpenMenu(true)}
        src={session?.user?.image ? session.user.image : "/img/avatar.png"}
        alt="avatar"
        className=" rounded-full w-10 object-cover ml-8 shadow-2xl"
      />
      {isOpenMenu && (
        <Menu
          onMouseLeave={() => setIsOpenMenu(false)}
          items={items}
          className=" absolute bottom-[-100px] right-[5px] drop-shadow-md rounded-md"
        ></Menu>
      )}
    </div>
  );

  return (
    <div className=" fixed z-50 w-screen">
      {/* desktop and tablet */}
      <div className="hidden md:flex justify-between items-center w-full h-full p-4 px-16 bg-white ">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img src="/img/logo.png" className="w-8 object-cover" alt="logo" />
          <p className=" text-headingColor text-xl font-bold">Food</p>
        </div>
        <ul className=" flex w-full justify-end items-center gap-12">
          <li
            onClick={() => router.push("/")}
            className=" text-headingColor font-400 cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out "
          >
            Home
          </li>
          <li className=" text-headingColor font-400 cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out ">
            Menu
          </li>
          <li className=" text-headingColor font-400 cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out ">
            About Us
          </li>
          <li className=" text-headingColor font-400 cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out ">
            Services
          </li>
        </ul>

        {isAuth ? (
          <>
            <div
              className=" relative flex items-center justify-center cursor-pointer"
              onClick={() => router.push("/shop-cart")}
            >
              <MdShoppingBasket className=" text-textColor text-2xl ml-8" />
              <div
                className={` bg-cartNumBg rounded-full w-5 h-5 flex justify-center items-center absolute top-0 right-[-10px] ${
                  countCart.length !== 0 ? "block" : "hidden"
                }`}
              >
                <p className="text-white text-xs font-semibold">
                  {countCart ? countCart.length : 0}
                </p>
              </div>
            </div>
            {avatarAndMenu}
          </>
        ) : (
          <Button
            shape="round"
            size="large"
            className="ml-8"
            onClick={() => signIn()}
          >
            <p className="text-[18px]">LogIn</p>
          </Button>
        )}
      </div>

      {/* mobile */}
      <div className="flex justify-between items-center md:hidden w-full h-full p-4 px-7 bg-white">
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2"
        >
          <img src="/img/logo.png" className="w-8 object-cover" alt="logo" />
          <p className=" text-headingColor text-[16px] sm:text-xl font-bold">
            Food
          </p>
        </div>
        {isAuth ? (
          <img
            onClick={() => setIsOpen(true)}
            src={session?.user?.image ? session.user.image : "/img/avatar.png"}
            alt="avatar"
            className=" rounded-full w-10 object-cover ml-8 shadow-2xl"
          />
        ) : (
          <Button
            shape="round"
            size="large"
            className="ml-8"
            onClick={() => signIn()}
          >
            <p className="text-[16px] sm:text-[18px]">LogIn</p>
          </Button>
        )}
        <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default Header;
