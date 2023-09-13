import React from "react";
import { IDetailBill } from "../../../types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button, Popconfirm, notification } from "antd";
import {
  Firestore,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import app from "@/app/share/firebaseConfig";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addMoreDishes, deleteAll } from "@/redux/slice/CartSlice";

type Props = {
  item: IDetailBill;
};

function BillItem({ item }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  // mua lai
  async function reOrder() {
    const db: Firestore = getFirestore(app);
    const orderRef = collection(db, "order");
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
    const bill: IDetailBill = {
      time: id,
      shopper: item.shopper,
      address: item.address,
      itemOrder: item.itemOrder,
      discount: item.discount,
      price: item.price,
    };
    await setDoc(doc(orderRef, id), bill);
    notification.success({
      message: "Đặt hàng thành công!",
    });
    dispatch(deleteAll());
    router.replace("/");
  }

  // di den shop cart
  function goToShopCart() {
    dispatch(deleteAll());
    dispatch(addMoreDishes(item.itemOrder));
    router.push("/shop-cart");
  }
  return (
    <div className="border-[0.3px] border-solid border-blue rounded-md mb-[15px] ssl:mb-[30px] p-[10px] ssl:p-[20px]">
      <div className="flex justify-start items-center flex-wrap gap-[10px] ssl:gap-[20px] mb-[20px] relative before:contents=[''] before:left-0 before:right-0 before:bottom-[-10px] before:w-full before:h-[0.3px] before:bg-blue before:absolute">
        {item.itemOrder.map((it) => (
          <div key={it.id} className=" relative">
            <LazyLoadImage
              effect="blur"
              src={it.image}
              className="w-[60px] h-[60px] ssl:w-[100px] ssl:h-[100px] border-[0.3px] border-solid border-blue rounded-md"
            />
            <span className=" absolute bottom-[6px] right-0 bg-blue p-1 text-white text-[12px] ssl:text-[14px] md:text-[16px]">
              x{it.count}
            </span>
          </div>
        ))}
      </div>
      <div className=" flex justify-between items-center flex-col ssl:flex-row text-[12px] ssl:text-[14px] md:text-[16px]">
        <div className=" justify-self-start w-full">
          <p className="text-[#ccc">{item.time}</p>
          <p className="text-[#ccc">{item.address}</p>
        </div>
        <div className=" flex flex-col justify-end items-end gap-[10px] w-full">
          <div className="text-[#ccc">
            Tổng tiền:
            <span className=" ml-[10px] font-semibold text-black">
              {item.price}₫
            </span>
          </div>
          <div className=" flex justify-center items-center gap-[10px] ssl:gap-[20px]">
            <Popconfirm
              title="Tiếp tục mua"
              description="Bạn muốn mua lại?"
              okText="Mua"
              okType="dashed"
              cancelText="Hủy"
              onConfirm={reOrder}
            >
              <Button
                shape="round"
                size="middle"
                className="border-blue border-[1px] border-solid text-blue"
              >
                Mua Lại
              </Button>
            </Popconfirm>
            <Button
              onClick={goToShopCart}
              shape="round"
              size="middle"
              className="border-blue border-[1px] border-solid text-blue"
            >
              Chi tiết hóa đơn
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillItem;
