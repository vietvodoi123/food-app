import React, { useEffect, useState } from "react";
import { GiFruitBowl, GiRoastChicken } from "react-icons/gi";
import { PiBowlFoodFill, PiIceCreamFill } from "react-icons/pi";
import { GiBowlOfRice, GiCirclingFish, GiShinyApple } from "react-icons/gi";
import { BiSolidDrink } from "react-icons/bi";
import {
  Firestore,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import app from "@/app/share/firebaseConfig";
import FruitsItem from "./FruitsItem";
type Props = {};

function HotDishes({}: Props) {
  const [key, setKey] = useState("");
  const [data, setData] = useState<IDish[]>();
  const [isLoading, setIsLoading] = useState(false);

  async function getData() {
    const db: Firestore = getFirestore(app);
    if (key) {
      const foodRef = collection(db, key);
      const data1 = [] as IDish[];

      const query = await getDocs(foodRef);
      query.forEach((doc) => {
        data1.push({ id: doc.id, ...doc.data() } as IDish);
      });
      setData(data1);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getData();
      setIsLoading(false);
    }, 1000);
  }, [key]);

  const itemNav = [
    { label: "Chicken", icon: <GiRoastChicken />, key: "chicken" },
    {
      label: "Curry",
      icon: <PiBowlFoodFill />,
      key: "curry",
    },
    {
      label: "Rice",
      icon: <GiBowlOfRice />,
      key: "rice",
    },
    {
      label: "Fish",
      icon: <GiCirclingFish />,
      key: "fish",
    },
    {
      label: "Fruits",
      icon: <GiShinyApple />,
      key: "fruits",
    },
    {
      label: "Ice Cream",
      icon: <PiIceCreamFill />,
      key: "creams",
    },
    {
      label: "Soft Drink",
      icon: <BiSolidDrink />,
      key: "drinks",
    },
  ];
  return (
    <div className="">
      <h1 className=" text-[20px] mb-[60px] md:text-[24px] lg:text-[28px] relative font-semibold after:absolute after:content-[' '] after:bg-textDelivery after:left-0 after:right-0 after:bottom-[-7px] after:w-[7%] after:h-[4px] after:rounded-full">
        Our Hot Dishes
      </h1>
      <div className=" mx-auto lg:w-[80%] xl:w-[80%] flex justify-center items-center flex-wrap gap-[20px] mb-[40px]">
        {itemNav.map((item) => (
          <div
            key={item.key}
            className={`w-[100px] drop-shadow-md rounded-md flex justify-center items-center flex-col gap-[10px] py-[20px] px-[10px] ${
              item.key === key ? "bg-cartNumBg" : "bg-gray0"
            } cursor-pointer hover:scale-110 hover:drop-shadow-xl`}
            onClick={() => {
              console.log(item.key);
              setKey(item.key);
            }}
          >
            <span
              className={`${
                item.key !== key
                  ? "bg-cartNumBg text-white"
                  : "bg-white text-cartNumBg"
              } p-3 rounded-full`}
            >
              {item.icon}
            </span>
            <p
              className={`${
                item.key === key ? "text-white" : "text-textColor"
              } text-[12px] lg:text-[14px] `}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px] gap-y-[40px] mx-auto mb-[50px]">
        {data?.map((item) => (
          <FruitsItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
export default HotDishes;
