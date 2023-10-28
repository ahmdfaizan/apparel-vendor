import fs from "fs";
import path from "path";
import { Apparels } from "../types";

let dataFilePath = path.resolve(__dirname, "data.json");

// data structure
let data: Apparels = {}; //# change to type

// prepare dataSource from json file
export function dataSource() {
  try {
    data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
  } catch (error) {
    data = {};
  } finally {
    return data;
  }
}

// save data to the JSON file
export function saveData(toSave: Apparels) {
  fs.writeFileSync(dataFilePath, JSON.stringify(toSave, null, 2), "utf-8");
  data = toSave;
}
