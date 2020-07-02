process.env.NODE_ENV = "test";
jest.mock("../../data/data");
const request = require("supertest");
const app = require("../../app");

let hammer = { name: "hammer", price: 19.99 };

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.items[0]).toEqual(hammer);
  });
});

describe("GET /items/:name", () => {
  test("Get item by name", async () => {
    const res = await request(app).get(`/items/items/${hammer.name}`);    
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(hammer);
  });
});

describe("POST /items", () => {
  test("Create one item", async () => {
    const nails = { name: "nails", price: 3.59 };
    const res = await request(app).post("/items/items").send(nails);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ "added": nails });
  });
});

describe("PATCH /items/:name", () => {
  const updateData =  { name: 'hammer_time', price: "20.00" };
  test("Update one item", async () => {    
    const res = await request(app)
      .patch(`/items/items/hammer`)
      .send(updateData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ updated: updateData })
  });  
});

describe("DELETE /items/:name", () => {
  test("Deleting one item", async () => {
    const res = await request(app)
      .delete(`/items/items/hammer`)
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "Deleted" })
  });
});
