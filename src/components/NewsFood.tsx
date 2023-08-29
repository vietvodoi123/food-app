"use client";
import app from "@/app/share/firebaseConfig";
import {
  Firestore,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import FoodItem from "./FoodItem";

type Props = {};

function NewsFood({}: Props) {
  const [data, setData] = useState<IDish[]>();
  const [isLoading, setIsLoading] = useState(false);

  async function getData() {
    const db: Firestore = getFirestore(app);
    const foodRef = collection(db, "homeFood");
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
    <div className=" row-span-2 md:row-auto flex justify-center items-center w-full md:block mt-[50px] sm:mt-[10px]">
      <div className="grid grid-cols-[45%_45%] lg:grid-cols-[40%_40%] xl:grid-cols-[250px_250px] gap-x-[20px] gap-y-[90px] mt-[40px] w-[90%] md:w-full">
        {data?.map((item) => (
          <FoodItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default NewsFood;
