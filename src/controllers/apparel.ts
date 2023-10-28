import { Request, Response } from "express";
import * as service from "../services";
import { Apparel, Order } from "../types";

export const updateApparel = async (req: Request, res: Response) => {
  try {
    const dataItem: Apparel = req.body; //# implement custom type
    await service.updateApparel(dataItem);
    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: (<Error>error).message });
  }
};

export const updateMultipleApparel = async (req: Request, res: Response) => {
  try {
    const dataItems: Apparel[] = req.body;
    await service.updateMultipleApparel(dataItems);
    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: (<Error>error).message });
  }
};

export const checkFulfillment = async (req: Request, res: Response) => {
  try {
    const order: Order = req.body;
    const response: { canFulfill: boolean; message: string } =
      service.checkFulfillment(order);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: (<Error>error).message });
  }
};

export const lowestCostCal = async (req: Request, res: Response) => {
  try {
    const order: Order = req.body;
    const response: { canFulfill: boolean; lowestCost?: number } =
      service.lowestCostCal(order);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: (<Error>error).message });
  }
};
