"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IDetailBill } from "../../../types";
import {
  Firestore,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  limitToLast,
  query,
  where,
} from "firebase/firestore";
import app from "@/app/share/firebaseConfig";
import BillItem from "./BillItem";

type Props = {};

function MyBill({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [bill, setBill] = useState<IDetailBill[]>();
  const { data: session } = useSession();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getMyBill();
    }, 500);
    setIsLoading(false);
  }, [session?.user]);

  async function getMyBill() {
    const db: Firestore = getFirestore(app);
    const myBillRef = collection(db, "order");

    const q = query(myBillRef, where("shopper", "==", session?.user?.email));
    const querySnap = await getDocs(q);

    const array: IDetailBill[] = [];

    querySnap.forEach((doc) => {
      array.push(doc.data() as IDetailBill);
    });
    setBill(array);
  }
  return (
    <div>
      <h1 className=" font-semibold text-[18px] ssl:text-[20px] mb-[15px] ssl:mb-[30px]">
        Đơn hàng của tôi
      </h1>
      <div>
        {bill?.reverse()?.map((item) => (
          <BillItem item={item} key={item.time} />
        ))}
      </div>
    </div>
  );
}

export default MyBill;
