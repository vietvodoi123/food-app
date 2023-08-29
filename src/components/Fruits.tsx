import app from "@/app/share/firebaseConfig";
import {
  Firestore,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import FruitsItem from "./FruitsItem";

function Fruits() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<IDish[]>();
  const [isLoading, setIsLoading] = useState(false);

  async function getData() {
    const db: Firestore = getFirestore(app);
    const foodRef = collection(db, "fruits");
    const data1 = [] as IDish[];

    const query = await getDocs(foodRef);
    query.forEach((doc) => {
      data1.push({ id: doc.id, ...doc.data() } as IDish);
    });
    setData(data1);
  }

  useEffect(() => {
    setIsLoading(true);
    getData();
    setIsLoading(false);
  }, []);

  return (
    <div className=" mt-[50px] md:mt-[70px]">
      <div className=" flex justify-between items-center mb-[30px]">
        <h1 className=" text-[20px] md:text-[24px] lg:text-[28px] relative font-semibold after:absolute after:content-[' '] after:bg-textDelivery after:left-0 after:right-0 after:bottom-[-7px] after:w-[40%] after:h-[4px] after:rounded-full">
          Our Fresh & Healthy Fruits
        </h1>
        <div className=" flex items-center gap-3 text-textDelivery">
          <span
            className=" bg-textDelivery hover:cursor-pointer text-white rounded-md p-2"
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            <AiFillCaretLeft />
          </span>
          <span
            className=" bg-textDelivery hover:cursor-pointer text-white rounded-md p-2"
            onClick={() => {
              if (page < 3) {
                setPage(page + 1);
              }
            }}
          >
            <AiFillCaretRight />
          </span>
        </div>
      </div>
      <div className="hidden lg:grid lg:grid-cols-5 gap-x-[10px] gap-y-[30px] mt-[70px] mb-[100px]">
        {!!!isLoading &&
          data
            ?.slice(5 * (page - 1), page * 5)
            .map((item) => <FruitsItem item={item} key={item.id} />)}
      </div>
      <div className="lg:hidden grid grid-cols-2 md:grid-cols-4 gap-x-[10px] gap-y-[30px] mt-[70px] mb-[100px]">
        {!!!isLoading &&
          data
            ?.slice(4 * (page - 1), page * 4)
            .map((item) => <FruitsItem item={item} key={item.id} />)}
      </div>
    </div>
  );
}

export default Fruits;
