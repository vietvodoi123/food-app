import { DefaultSession } from "next-auth";

interface IDish {
  id: string;
  name: string;
  image: string;
  price: number;
  purches: number;
  type: string;
}

interface ICartItem extends IDish {
  count: number;
}
interface IDiscount {
  percent: number;
}
interface IUser {
  name: string | null | undefined;
  email: string | null | undefined;
  iamge: string | null | undefined;
}
interface IDetailBill {
  time: string;
  shopper?: string | null | undefined;
  address: string;
  itemOrder: ICartItem[];
  discount: IDiscount;
  price: number;
}
