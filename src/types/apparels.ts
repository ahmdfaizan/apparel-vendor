export type Apparel = {
  code: string;
  size: string;
  stock: number;
  price: number;
};

export type Apparels = {
  [code: string]: { [size: string]: { stock: number; price: number } };
};
