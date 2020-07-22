const request = require("supertest");
const app = require("../app");
const db = require("../db");
const User = require("../models/user");
const Message = require("../models/message");
describe("Message Routes Test", function () {
  // let user1, user2;
  beforeEach(async function () {
    await db.query("DELETE FROM messages");
    await db.query("DELETE FROM users");
    await db.query("ALTER SEQUENCE messages_id_seq RESTART WITH 1");

    let user1 = await User.register({
      username: "test1",
      password: "password",
      first_name: "Test1",
      last_name: "Testy1",
      phone: "+14155550000",
    });
    let user2 = await User.register({
      username: "test2",
      password: "password",
      first_name: "Test2",
      last_name: "Testy2",
      phone: "+14155552222",
    });
    let m1 = await Message.create({
      from_username: "test1",
      to_username: "test2",
      body: "u1-to-u2"
    });
    let m2 = await Message.create({
      from_username: "test2",
      to_username: "test1",
      body: "u2-to-u1"
    });
  });

  describe("GET /messages/:id", function () {

    test("can get by id NOT logged in", async function () {      
      let response = await request(app)
        .get(`/messages/${1}`)
      expect(response.statusCode).toBe(401);
    });

    test("can get by id logged in as from user", async function () {
      let auth = await request(app)
        .post("/auth/login")
        .send({ username: "test1", password: "password" });
      let response = await request(app)
        .get(`/messages/${1}`)
        .send({"_token": auth.body.token});
      expect(response.statusCode).toBe(200);
    });

    test("can get by id logged in as to user", async function () {
      let auth = await request(app)
        .post("/auth/login")
        .send({ username: "test2", password: "password" });
      let response = await request(app)
        .get(`/messages/${1}`)
        .send({"_token": auth.body.token});
      expect(response.statusCode).toBe(200);
    });

  });

  describe("POST /messages/", function () {
    const testData = {
      from_username: "test1",
      to_username: "test2",
      body: "user1 to user2"
    }
    test("can create new message if NOT logged in", async function () {      
      let response = await request(app)
        .post(`/messages/`)
        .send(testData)
      expect(response.statusCode).toBe(401);
    });

    test("can create new message if logged in but NOT correct from_username", async function () {  
      let auth = await request(app)
        .post("/auth/login")
        .send({ username: "test2", password: "password" });    
      let response = await request(app)
        .post(`/messages/`)
        .send({"_token": auth.body.token, "data": testData});
      expect(response.statusCode).toBe(401);
    });

    test("can create new message if logged in and is correct from_username", async function () {  
      let auth = await request(app)
        .post("/auth/login")
        .send({ username: "test1", password: "password" });    
      let response = await request(app)
        .post(`/messages/`)
        .send({"_token": auth.body.token, "data": testData});
      expect(response.statusCode).toBe(200);
    });

  });

  describe("POST /:id/read", function () {

    const testId = 1, from_u = "test1", to_u = "test2";
    
    test("can create new message if NOT logged in", async function () {      
      let response = await request(app)
        .post(`/messages/${testId}/read`)
      expect(response.statusCode).toBe(401);
    });

    test("can create new message if logged in but NOT correct from_username", async function () {  
      let auth = await request(app)
        .post("/auth/login")
        .send({ username: from_u, password: "password" });    
      let response = await request(app)
        .post(`/messages/${testId}/read`)
        .send({"_token": auth.body.token});
      expect(response.statusCode).toBe(401);
    });

    test("can alter message mark as read if logged in and is correct to_username", async function () {  
      let auth = await request(app)
        .post("/auth/login")
        .send({ username: to_u, password: "password" });  
      let response = await request(app)
        .post(`/messages/${testId}/read`)
        .send({"_token": auth.body.token});
      expect(response.statusCode).toBe(200);
    });

  });

});

afterAll(async function () {
  await db.end();
});
