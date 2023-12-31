import { Button, Empty, Form, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack, BiCartAlt } from "react-icons/bi";
import { SiUbereats } from "react-icons/si";
import { BsArrowRight } from "react-icons/bs";
import { IRootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CartItem from "@/components/home/CartItem";
import { formatNumberWithCommas } from "../../app/function/transform";
import TextInput from "@/components/input/TextInput";
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import app from "../../app/share/firebaseConfig";
import { IDetailBill } from "../../../types";
import { deleteAll } from "@/redux/slice/CartSlice";

type Props = {};
interface ITransport {
  icon: React.ReactElement;
  key: string;
  price: number;
}
function DetailBill({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [address, setAddress] = useState("");
  const [discount, setDiscount] = useState("");
  const [checkDiscount, setCheckDiscount] = useState<any>();
  const [transport, setTransport] = useState<ITransport>({
    icon: <SiUbereats className="text-[32px] text-blue" />,
    key: "uber",
    price: 23000,
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const cartList = useSelector((state: IRootState) => state.cart.cartList);
  const total = useSelector((state: IRootState) => state.cart.total);

  async function getDiscount() {
    const db: Firestore = getFirestore(app);
    if (discount !== "") {
      const discountRef = doc(db, "discount", discount);
      const query = await getDoc(discountRef);
      const percent = query.data();
      console.log(percent);

      if (percent) {
        setCheckDiscount(percent);
      } else {
        setCheckDiscount(undefined);
      }
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getDiscount();
    setIsLoading(false);
  }, [discount]);

  const dv = [
    {
      icon: <SiUbereats className="text-[32px] text-blue" />,
      key: "uber",
      price: 23000,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="20"
          viewBox="0 0 522.6 201.3"
          id="grab"
        >
          <path
            fill="#00b45e"
            d="M415.9 63.4V0h13v54.5c-3.6 1.8-8.5 5.2-13 8.9zm-22.6 19.1c4-4.8 8.1-9.6 13-13.7V0h-13v82.5zm-150.6 50.4c0 16.9 6.7 33 19 45.3 12.2 12.2 28.3 19 45.3 19 7.2 0 14.6-1.5 19.8-4.1v-13c-6.1 2.6-13.5 4.1-19.8 4.1-27.8 0-51.2-23.4-51.2-51.2v-11.7c0-27.8 23.5-51.2 51.2-51.2 13.8 0 26.7 5.3 36.3 14.9 9.6 9.6 14.9 22.5 14.9 36.3v76h13v-78.5c-.8-16.6-7.9-32.1-19.9-43.7-12.1-11.6-27.8-18-44.3-18-16.9 0-33 6.7-45.3 19-12.2 12.2-19 28.3-19 45.3v11.5zm194.6-31.2c5.9-5.9 13.5-9.2 21-9.2 16.1 0 28.6 12.6 28.6 28.6v11.7c0 16.1-12.6 28.6-28.6 28.6-7.8 0-15.3-4.3-21.2-12-5.2-6.8-8.6-16.1-9.1-24.4l-10.5 13c2.1 9.8 7.2 19.3 14.5 25.9 7.5 6.8 16.9 10.6 26.3 10.6 23 0 41.7-18.7 41.7-41.6v-11.7c0-10.9-4.4-21.3-12.4-29.2-8-8-18.4-12.4-29.3-12.4-6.9 0-17.8 2.5-30.8 14.2-3.5 3.5-11.7 11.7-16.7 17.5-8.4 9.2-20.5 22.9-30.9 36.8v20.3c11.5-14.8 18.1-23.1 29-35.6 9.6-11.4 21.6-25.1 28.4-31.1zM130.1 77.2V61.8c-11.8-6.3-24.6-9.1-41.6-9.1-17.4 0-33.9 6.4-46.4 17.9-12.6 11.6-19.5 26.8-19.5 43v4.2c0 33.6 26.9 60.9 60.1 60.9 26.9 0 38-8.8 40.8-11.6V128h-44v13h31.8v19.6h-.1c-4.1 1.6-12.6 5-28.5 5-12.6 0-24.5-4.9-33.3-13.9-8.9-9-13.7-21-13.7-34v-4.2c0-25.9 24.2-47.9 52.9-47.9 19.7.1 31.5 3.4 41.5 11.6zm94.8 15.3c4.9 0 9.1.8 12.5 2.4 1.6-4 3.3-7.4 5.7-11.4-3.5-2.5-12-4.1-18.2-4.1-23.7 0-41.6 17.9-41.6 41.7v76h13v-76c0-16.8 11.7-28.6 28.6-28.6zM0 113.6v4.2c0 22.6 8.6 43.6 24.1 59.3 15.5 15.6 36.3 24.2 58.5 24.2 17.9 0 33.7-4 47.1-12 11-6.6 15.9-13.2 16.3-13.8v-70H79.5v13H133v53.1c-6.3 6.3-21.2 16.8-50.3 16.8-19 0-36.6-7.3-49.6-20.5-12.9-13.1-20-30.9-20-50v-4.2c0-18.1 8.1-36.1 22.3-49.4 14.5-13.6 33.4-21.1 53.2-21.1 18.5 0 31.3 2.8 41.6 9.1V37.6C119.4 33 106.5 31 88.5 31 40.5 31 0 68.8 0 113.6zm348.5 83.5v-76c0-23.4-18.3-41.7-41.7-41.7-10.9 0-21.3 4.4-29.3 12.4s-12.4 18.4-12.4 29.2v11.7c0 22.6 19.1 41.6 41.6 41.6 6.2 0 14.6-1.5 19.8-5.8V155c-5.1 4.1-12.4 6.5-19.8 6.5-16 0-28.6-12.6-28.6-28.6v-11.7c0-16.1 12.6-28.6 28.6-28.6 16.1 0 28.6 12.6 28.6 28.6v76h13.2zM224.9 69.9c8.8 0 16.5 1.9 23.4 5.8 3.2-4.1 6.5-7.3 9-9.8-7.3-5.6-19.7-9-32.3-9-18.1 0-34.5 6.5-46.2 18.4-11.6 11.7-18 28-18 45.9v76h13v-76c-.1-30.2 20.9-51.3 51.1-51.3zm278.7 6c-12.2-12.2-28.3-19-45.3-19-12.4 0-24.8 4.6-31.7 9.2-14.2 9.4-25.8 19.7-46.8 46.8v19.5c17.8-23.2 34.6-41.4 47.4-51.5 8.4-6.7 20.3-10.9 31.1-10.9 27.8 0 51.2 23.5 51.2 51.2v11.7c0 13.7-5.4 26.6-15.2 36.3-9.7 9.6-22.5 14.9-36 14.9-22.8 0-42.9-15.7-48.3-37l-9.2 11.1c6.7 22.4 30.9 38.9 57.5 38.9 17 0 33-6.8 45.3-19 12.2-12.3 19-28.3 19-45.3v-11.7c0-16.9-6.8-33-19-45.2z"
          ></path>
        </svg>
      ),
      key: "grab",
      price: 18000,
    },
  ];

  async function onOrder() {
    setIsError(false);
    if (cartList.length === 0 || address === "") {
      setIsError(true);
    } else {
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
        shopper: session?.user?.email,
        address: address,
        itemOrder: cartList,
        discount: checkDiscount,
        price: total,
      };
      const db: Firestore = getFirestore(app);
      const orderRef = collection(db, "order");
      await setDoc(doc(orderRef, id), bill);
      notification.success({
        message: "Đặt hàng thành công!",
      });
      dispatch(deleteAll());
      router.replace("/");
    }
  }
  return (
    <div className=" bg-orange1 text-white rounded-2xl p-[10px] md:p-[20px] lg:p-[30px] max-h-[540px]">
      <div className="flex justify-between items-center mb-[10px] ss:mb-[20px]">
        <p className="text-[16px] ss:text-[20px] font-semibold">
          Chi Tiết Hóa Đơn
        </p>
        <img
          src={session?.user?.image ? session.user.image : "/img/avatar.png"}
          className=" rounded-xl w-[30px] ss:w-[40px]"
        />
      </div>
      <div className="text-[12px] ss:text-[14px] lg:text-[16px] mb-[10px] relative after:contents=[''] after:absolute after:bg-white after:left-0 after:right-0 after:bottom-[-10px] after:w-full after:h-[1px]">
        <p className="mb-[10px]">Đơn vị vận chuyển: </p>
        <div className=" mb-[20px] flex justify-start items-center gap-[10px]">
          {dv.map((itemdv) => (
            <span
              key={itemdv.key}
              onClick={() => setTransport(itemdv)}
              className={`${
                transport && transport.key === itemdv.key
                  ? "border-blue border-[3px] border-solid"
                  : "none"
              } w-[50px] h-[50px] bg-white rounded-md flex justify-center items-center`}
            >
              {itemdv.icon}
            </span>
          ))}
        </div>
        <div className=" text-orange1 relative">
          <TextInput name="Địa Chỉ" setData={setAddress} />
          {isError && (
            <p className=" absolute bottom-[45px] text-[12px] text-cartNumBg">
              Địa chỉ không được bỏ trống
            </p>
          )}
          <div className=" relative">
            <TextInput name="Mã Giảm Giá" setData={setDiscount} />
            {discount !== "" && (
              <div className="absolute right-[10px] top-[50%] translate-y-[-50%] text-green-500">
                {isLoading === true && (
                  <AiOutlineLoading3Quarters className=" animate-spin" />
                )}
                {isLoading === false &&
                  checkDiscount !== undefined &&
                  checkDiscount !== null && <AiOutlineCheck className="" />}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mb-[20px] text-[12px] ss:text-[14px]">
        <p className="flex justify-between items-center">
          Tổng Tiền Sản Phẩm:{" "}
          <span className="text-[14px] ss:text-[16px] font-bold">
            {formatNumberWithCommas(total)} vnđ
          </span>
        </p>
        <p className="flex justify-between items-center">
          Giảm Giá:{" "}
          <span className="text-[14px] ss:text-[16px] font-bold">
            {checkDiscount
              ? formatNumberWithCommas((total * checkDiscount.percent) / 100)
              : 0}{" "}
            vnđ
          </span>
        </p>
        <p className="flex justify-between items-center mb-[10px]">
          Phí Vận Chuyển:{" "}
          <span className="text-[14px] ss:text-[16px] font-bold">
            {transport ? formatNumberWithCommas(transport.price) : 0} vnđ
          </span>
        </p>
        <p className="flex justify-between items-center ">
          Tổng:{" "}
          <span className="text-[14px] ss:text-[16px] font-bold">
            {checkDiscount
              ? formatNumberWithCommas(
                  total -
                    (total * checkDiscount.percent) / 100 +
                    transport.price
                )
              : formatNumberWithCommas(total + transport.price)}{" "}
            vnđ
          </span>
        </p>
      </div>
      <Button
        size="large"
        onClick={onOrder}
        className="flex justify-between items-center w-full text-white bg-textDelivery"
      >
        <p className="text-[14px] ss:text-[16px] font-bold">
          {checkDiscount
            ? formatNumberWithCommas(
                total - (total * checkDiscount.percent) / 100 + transport.price
              )
            : formatNumberWithCommas(total + transport.price)}{" "}
          vnđ
        </p>
        <span className="text-[14px] ss:text-[16px] flex justify-between items-center">
          Xác Nhận <BsArrowRight className=" inline" />
        </span>
      </Button>
    </div>
  );
}

export default DetailBill;
