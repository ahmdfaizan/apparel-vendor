import { dataSource, saveData } from "../database/helper";
import { Apparel, Apparels, Order } from "../types";
const dbData: Apparels = dataSource(); //# assign type

function processApparelData(apparels: Apparels, dataItem: Apparel) {
  let { code, size, stock, price } = dataItem;
  code = code.toLowerCase();
  size = size.toLowerCase();

  if (!apparels[code]) {
    // create if does not exist
    apparels[code] = {};
  }
  apparels[code][size] = {
    stock: stock || apparels[code][size].stock,
    price: price || apparels[code][size].price,
  };
}

export const updateApparel = async (dataItem: Apparel) => {
  //# implement custom type
  const apparels = { ...dbData };
  processApparelData(apparels, dataItem);
  saveData(apparels);
};

export const updateMultipleApparel = async (dataItems: Apparel[]) => {
  const apparels = { ...dbData };
  dataItems.forEach((dataItem: Apparel) => {
    processApparelData(apparels, dataItem);
  });
  saveData(apparels);
};

export const checkFulfillment = (
  order: Order
): { canFulfill: boolean; message: string } => {
  let canFulfill = true;
  let message = "OK";

  for (const item of order) {
    let { code, size, quantity } = item;
    code = code.toLowerCase();
    size = size.toLowerCase();

    const stockExists =
      dbData[code] && dbData[code][size] && dbData[code][size].stock;

    if (!stockExists || dbData[code][size].stock < quantity) {
      canFulfill = false;
      message = `Filfillment failed>> code: ${code}, size: ${size}, order: ${quantity}, stock: ${
        stockExists ? dbData[code][size].stock : "NA"
      }`;
      break;
    }
  }
  return { canFulfill, message };
};

export const lowestCostCal = (
  order: Order
): { canFulfill: boolean; lowestCost?: number } => {
  let canFulfill = true;
  let lowestCost = 0;
  for (const item of order) {
    let { code, size, quantity } = item;
    code = code.toLowerCase();
    size = size.toLowerCase();

    const stockExists =
      dbData[code] && dbData[code][size] && dbData[code][size].stock;

    if (!stockExists || dbData[code][size].stock < quantity) {
      return { canFulfill: false };
    }

    /* 
    fetching lowest cost is same as normal cost becuase as per requirement 
    item code and size combination is unique for all products Hence no additional
    filtering required.
    */
    lowestCost += dbData[code][size].price * quantity;
  }
  return { canFulfill, lowestCost };
};
