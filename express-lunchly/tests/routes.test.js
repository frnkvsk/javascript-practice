process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testCustomer;

const testCustomerData = {
  firstName: 'fname2',
  middleName: 'mname2',
  lastName: 'lname2',
  phone: '123-456-7890',
  notes: 'Testing notes for testData'
};

const testReservationData = {
  startAt: "2018-06-18 19:31:59-07", 
  numGuests: 5, 
  notes: "test reservation notes"
}

beforeAll(async () => {
  await db.query('DELETE FROM reservations');
  await db.query('DELETE FROM customers');
});

beforeEach(async () => {
  const res1 = await db.query(`INSERT INTO customers
                  (first_name, middle_name, last_name, phone, notes)
                  VALUES ($1, $2, $3, $4, $5)
                  RETURNING *`,
                  ["fname","mname","lname","123-456-7890","test customer notes"]);
  testCustomer = res1.rows[0];

});

afterEach(async () => {
  await db.query('DELETE FROM reservations');
  await db.query('DELETE FROM customers');
});

afterAll(() => db.end());

describe("GET /", () => {
  test("Get a list of all customers", async () => {
    const resp = await request(app).get("/");
    expect(resp.statusCode).toBe(200);
    expect(resp.request.req.method).toBe("GET");
    expect(resp.request.req.path).toBe("/");
    expect(resp.text).toContain(`${testCustomer.first_name} ${testCustomer.middle_name} ${testCustomer.last_name}`);
  });
});

describe("GET /:id/", () => {
  test("Get a customer by id", async () => {
    const resp = await request(app).get(`/${testCustomer.id}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.request.req.method).toBe("GET");
    expect(resp.request.req.path).toBe(`/${testCustomer.id}`);
    expect(resp.text).toContain(`${testCustomer.first_name} ${testCustomer.middle_name} ${testCustomer.last_name}`);
  });
});

describe("GET /add/", () => {
  test("Form to add a new customer", async () => {
    const resp = await request(app).get("/add/");
    expect(resp.statusCode).toBe(200);
    expect(resp.request.req.method).toBe("GET");
    expect(resp.request.req.path).toBe(`/add/`);
    expect(resp.text).toContain("<h1>Add a Customer</h1>");
  });
});

describe("POST /add/", () => {  
  test("Add a new customer", async () => {
    const resp = await request(app)  
      .post("/add/")
      .send(testCustomerData);
    // test if redirected 
    expect(resp.statusCode).toBe(302);
    // test if redirected with id number "/:id/"
    expect(+resp.header.location.replace(/\//g, '')).toEqual(expect.any(Number));
  })
});

describe("GET /best/", () => {
  test("Test getting the best customers", async () => {
    const resp = await request(app).get("/best/");
    expect(resp.statusCode).toBe(200);
    expect(resp.request.req.method).toBe("GET");
    expect(resp.request.req.path).toBe(`/best/`);
    expect(resp.text).toContain("<h1>Best Customers</h1>");
  });
});

describe("GET /:id/edit/", () => {
  test("Test get form to edit a customer", async () => {
    const resp = await request(app).get(`/${testCustomer.id}/edit`);
    expect(resp.statusCode).toBe(200);
    expect(resp.request.req.method).toBe("GET");
    expect(resp.request.req.path).toBe(`/${testCustomer.id}/edit`);
    expect(resp.text).toContain("<h1>Edit Customer</h1>"); 
  });
});

describe("POST /:id/edit/", () => {
  test("Test post form to edit a customer", async () => {
    const resp = await request(app)
      .post(`/${testCustomer.id}/edit`)
      .send(testCustomerData);
    // test if redirected 
    expect(resp.statusCode).toBe(302);
    expect(resp.request.req.method).toBe("POST");
    expect(resp.request.req.path).toBe(`/${testCustomer.id}/edit`);
    // test if redirected with id number "/:id/"
    expect(+resp.header.location.replace(/\//g, '')).toEqual(testCustomer.id);
    // test if user data was edited to be the same as testData
    const resp2 = await request(app).get(`/${testCustomer.id}`);
    expect(resp2.text).toContain(`${testCustomerData.firstName} ${testCustomerData.middleName} ${testCustomerData.lastName}`);
  });
});

describe("POST /:id/add-reservation/", () => {
  test("Test add a new reservation", async () => {
    const resp = await request(app)
      .post(`/${testCustomer.id}/add-reservation/`)
      .send(testReservationData);
    // test if redirected 
    expect(resp.statusCode).toBe(302);
    expect(resp.request.req.method).toBe("POST");
    expect(resp.request.req.path).toBe(`/${testCustomer.id}/add-reservation/`);
    // test if redirected with id number "/:id/"
    expect(+resp.header.location.replace(/\//g, '')).toEqual(testCustomer.id);
  });
});

describe("POST /search/", () => {  
  test("", async () => {    
    const searchTerm = testCustomer.first_name;
    console.log(searchTerm, testCustomer)
    const resp = await request(app)
      .post(`/search/`)
      .send({ search: searchTerm });
    expect(resp.statusCode).toBe(200);
    expect(resp.request.req.method).toBe("POST");
    expect(resp.request.req.path).toBe(`/search/`);
    expect(resp.text).toContain(`${testCustomer.first_name} ${testCustomer.middle_name} ${testCustomer.last_name}`);
  });
});