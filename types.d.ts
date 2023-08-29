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
