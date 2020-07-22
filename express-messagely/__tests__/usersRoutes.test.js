const request = require("supertest");
const app = require("../app");
const db = require("../db");
const User = require("../models/user");
const Message = require("../models/message");

describe("Users Routes Test", function () {

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

  /** GET / - get list of users.
  *
  * => {users: [{username, first_name, last_name, phone}, ...]}
  *
  **/
  describe("GET /users/", function () {

    test("can get list of users if NOT logged in", async function () {
      let response = await request(app).get(`/users/`);
      expect(response.statusCode).toBe(401);
    });

    test("can get list of users if logged in", async function () {
      let auth = await request(app)
        .post("/auth/login")
        .send({ username: "test1", password: "password" });
      let response = await request(app)
        .get(`/users/`)
        .send({"_token": auth.body.token});
      expect(response.statusCode).toBe(200);
      expect(response.body.users[0].username).toBe("test1");
    });

  });
 
 /** GET /:username - get detail of users.
  *
  * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
  *
  **/
  describe("GET /users/:username", function () {
    const userName = "test1";
    test("can get user by username if NOT logged in", async function () {
      let response = await request(app).get(`/users/${userName}`);
      expect(response.statusCode).toBe(401);
    });

    test("can get user by username if logged in", async function () {
      let auth = await request(app)
        .post("/auth/login")
        .send({ username: "test1", password: "password" });
      let response = await request(app)
        .get(`/users/${userName}`)
        .send({"_token": auth.body.token});
      expect(response.statusCode).toBe(200);
      expect(response.body.user.username).toBe("test1");
    });

  });
 
 /** GET /:username/to - get messages to user
  *
  * => {messages: [{id,
  *                 body,
  *                 sent_at,
  *                 read_at,
  *                 from_user: {username, first_name, last_name, phone}}, ...]}
  *
  **/
  describe("GET /users/:username/to", function () {
    const to_u = "test1", from_u = "test2";
    test("can get user by username if NOT logged in", async function () {
      let response = await request(app).get(`/users/${to_u}/to`);
      expect(response.statusCode).toBe(401);
    });

    test("can get user by username if logged in", async function () {
      let auth = await request(app)
        .post("/auth/login")
        .send({ username: to_u, password: "password" });
      let response = await request(app)
        .get(`/users/${to_u}/to`)
        .send({"_token": auth.body.token});
      expect(response.statusCode).toBe(200);
      expect(response.body.messages[0].from_user.username).toBe(from_u);
    });
  });
 
 /** GET /:username/from - get messages from user
  *
  * => {messages: [{id,
  *                 body,
  *                 sent_at,
  *                 read_at,
  *                 to_user: {username, first_name, last_name, phone}}, ...]}
  *
  **/
  describe("GET /users/:username/from", function () {
    const to_u = "test1", from_u = "test2";
    test("can get user by username if NOT logged in", async function () {
      let response = await request(app).get(`/users/${from_u}/from`);
      expect(response.statusCode).toBe(401);
    });

    test("can get user by username if logged in", async function () {
      let auth = await request(app)
        .post("/auth/login")
        .send({ username: from_u, password: "password" });
      let response = await request(app)
        .get(`/users/${from_u}/from`)
        .send({"_token": auth.body.token});
      expect(response.statusCode).toBe(200);
      expect(response.body.messages[0].to_user.username).toBe(to_u);
    });
  });










});

afterAll(async function () {
  await db.end();
});