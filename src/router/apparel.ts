import { Router } from "express";

import {
  updateApparel,
  updateMultipleApparel,
  checkFulfillment,
  lowestCostCal,
} from "../controllers";
import { reqValidator } from "../middlewares";
import { apparel, apparels, order } from "../validators";

export default (router: Router) => {
  router.post("/apparel/update", reqValidator(apparel), updateApparel);
  router.post(
    "/apparel/update-multiple",
    reqValidator(apparels),
    updateMultipleApparel
  );
  router.post(
    "/apparel/check-fulfillment",
    reqValidator(order),
    checkFulfillment
  );
  router.get("/apparel/lowest-cost", reqValidator(order), lowestCostCal);
};
