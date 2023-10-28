import fs from "fs";
import { Apparels } from "../types";
const dataFile = "src/database/data.json";

// data structure
let data: Apparels = {}; //# change to type

// prepare dataSource from json file
export function dataSource() {
  try {
    data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
    console.log(data);
  } catch (error) {
    console.log("Error: ", error);
    data = {};
  } finally {
    return data;
  }
}

// save data to the JSON file
export function saveData(toSave: Apparels) {
  fs.writeFileSync(dataFile, JSON.stringify(toSave, null, 2), "utf-8");
  data = toSave;
}
