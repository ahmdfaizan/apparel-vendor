// __tests__/apparel.test.ts
import request from "supertest";
import { app } from "../src/app"; // Assuming your Express app is in a file named 'apparel.ts'
import { Apparels } from "../src/types";

describe("Execute update apparel", () => {
  it("should update exiting stock and price for one apparel code and size", async () => {
    const response = await request(app)
      .post("/api/apparel/update")
      .send({ code: "t-shirt-101", size: "small", stock: 10, price: 25 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data updated successfully");
  });
  it("should add new stock and price for one apparel code and size", async () => {
    const response = await request(app)
      .post("/api/apparel/update")
      .send({ code: "t-shirt-110", size: "small", stock: 10, price: 25 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data updated successfully");
  });
  it("should throw 400 error on missing body ", async () => {
    const response = await request(app).post("/api/apparel/update").send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"code" is required');
  });
  it("should throw 400 when stock is not a number", async () => {
    const response = await request(app)
      .post("/api/apparel/update")
      .send({ code: "t-shirt-101", size: "small", stock: "xyz", price: 25 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"stock" must be a number');
  });
  it("should throw 400 when price is not a number", async () => {
    const response = await request(app)
      .post("/api/apparel/update")
      .send({ code: "t-shirt-101", size: "small", stock: 25, price: "xyz" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"price" must be a number');
  });
  it("should throw 400 when price is than or equal to 0", async () => {
    const response = await request(app)
      .post("/api/apparel/update")
      .send({ code: "t-shirt-101", size: "small", stock: 0, price: 0 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      '"price" must be greater than or equal to 1'
    );
  });
});
describe("Execute update apparels", () => {
  it("should update stock and price for one apparels code and size", async () => {
    const response = await request(app)
      .post("/api/apparel/update-multiple")
      .send([
        {
          code: "T-Shirt-101",
          size: "XXL",
          stock: 10000,
          price: 100.1,
        },
        {
          code: "T-Shirt-102",
          size: "XXL",
          stock: 100,
          price: 109.1,
        },
      ]);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data updated successfully");
  });
  it("should throw 400 error on missing array body ", async () => {
    const response = await request(app)
      .post("/api/apparel/update-multiple")
      .send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"value" must be an array');
  });
  it("should throw 400 when array is not an array of objects", async () => {
    const response = await request(app)
      .post("/api/apparel/update-multiple")
      .send(["xyz"]);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"[0]" must be of type object');
  });
  it("should throw 400 when required fields are missing", async () => {
    const response = await request(app)
      .post("/api/apparel/update-multiple")
      .send([{ size: "small", stock: 25, price: "xyz" }]);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"[0].code" is required');
  });
});
describe("Execute check fulfillment", () => {
  it("should check if a customer order can be fulfilled", async () => {
    const response = await request(app)
      .post("/api/apparel/check-fulfillment")
      .send([{ code: "t-shirt-101", size: "small", quantity: 2 }]);

    expect(response.status).toBe(200);
    expect(response.body.canFulfill).toBe(true);
    expect(response.body.message).toBe("OK");
  });

  it("should throw 400 error on missing array body ", async () => {
    const response = await request(app)
      .post("/api/apparel/check-fulfillment")
      .send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"value" must be an array');
  });

  it("should throw 400 error when quantity is not an integer", async () => {
    const response = await request(app)
      .post("/api/apparel/check-fulfillment")
      .send([{ code: "t-shirt-101", size: "small", quantity: 1.1 }]);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"[0].quantity" must be an integer');
  });

  it("should throw 400 error if order quatity is greater than 1000", async () => {
    const response = await request(app)
      .post("/api/apparel/check-fulfillment")
      .send([{ code: "t-shirt-101", size: "small", quantity: 10000 }]);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      '"[0].quantity" must be less than or equal to 1000'
    );
  });
  it("should throw 400 error if order cant be fulfilled", async () => {
    const response = await request(app)
      .post("/api/apparel/check-fulfillment")
      .send([{ code: "t-shirt-101", size: "small", quantity: 1000 }]);

    expect(response.status).toBe(400);
    expect(response.body.canFulfill).toBe(false);
    expect(response.body.message).toEqual(expect.any(String));
  });
});
describe("Execute cal lowest cost", () => {
  it("should get the lowest cost to fulfill an order", async () => {
    const response = await request(app)
      .get("/api/apparel/lowest-cost")
      .send([{ code: "t-shirt-101", size: "small", quantity: 2 }]);

    expect(response.status).toBe(200);
    expect(response.body.canFulfill).toBe(true); // Adjust this expected value based on your test data
    expect(response.body.lowestCost).toEqual(expect.any(Number));
  });
  it("should throw 400 error on missing array body ", async () => {
    const response = await request(app).get("/api/apparel/lowest-cost").send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"value" must be an array');
  });
  it("should throw 400 error when  array in body is empty ", async () => {
    const response = await request(app)
      .get("/api/apparel/lowest-cost")
      .send([]);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"value" must contain at least 1 items');
  });
  it("should throw 400 error if order cant be fulfilled", async () => {
    const response = await request(app)
      .get("/api/apparel/lowest-cost")
      .send([{ code: "t-shirt-101", size: "small", quantity: 1000 }]);

    expect(response.status).toBe(400);
    expect(response.body.canFulfill).toBe(false);
  });
});
