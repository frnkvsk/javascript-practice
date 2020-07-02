process.env.NODE_ENV = "test";
const request = require("supertest");
const fs = require("fs");
// const app = require("../app");
const DataStore = require("./data.js")
const filePath = "./data.txt";

let hammer = { name: "hammer", price: 19.99 };

beforeEach(async () => {
  // items.push(hammer);
  await DataStore.post(hammer);
});

afterEach(async () => {
  fs.writeFile(filePath, "", "utf8", (err, data) => {
    if(err) console.error(err);
  }); 
  // fs.close(); 
});

describe("GET /items", () => {
  // setTimeout(async () => {
    test("Get all items", async () => {
      const res = await DataStore.get();
      console.log("///////////////////////////////")
      console.log("res => ",res)
      expect(res).toEqual(null);
    });
  // }, 1000);
  
});

// describe("GET /items/:name", () => {
//   test("Get item by name", async () => {
//     const res = await get.get(hammer.name); 
//     expect(res.body).toEqual(hammer);
//   });
// });

// describe("POST /items", () => {
//   test("Create one item", async () => {
//     const nails = { name: "nails", price: 3.59 };
//     const res = await request(app).post("/items/items").send(nails);
//     expect(res.statusCode).toBe(201);
//     expect(res.body).toEqual({ "added": nails });
//   });
// });

// describe("PATCH /items/:name", () => {
//   const updateData =  { name: 'hammer_time', price: "20.00" };
//   test("Update one item", async () => {    
//     const res = await request(app)
//       .patch(`/items/items/hammer`)
//       .send(updateData);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toEqual({ updated: updateData })
//   });  
// });

// describe("DELETE /items/:name", () => {
//   // test("Deleting one item", async () => {
//   //   const res = await request(app)
//   //     .delete(`/items/items/hammer`)
//   //     .send();
//   //   expect(res.statusCode).toEqual(200);
//   //   console.log("res.body => ",res.body)
//   //   expect(res.body).toEqual({ message: "Deleted" })
//   // });

//   test("Update with invalid name items", async () => {
//     const res = await request(app)
//       .delete(`/items/items/screwdriver`)
//       .send();
//     console.log("///////////////////////////////")
//     console.log("res => ",res)
//     expect(res.statusCode).toEqual(404);
//   });  
// });
