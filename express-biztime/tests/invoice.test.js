process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testInvoice;
let testCompany;

beforeAll(async () => {
  await db.query(`DELETE FROM invoices`);
  await db.query(`DELETE FROM companies`);
});

beforeEach(async () => {
  
  const res = await db.query(`INSERT INTO companies 
                              (code, name, description) 
                              VALUES ($1, $2, $3) 
                              RETURNING *`,
                              ["ABC_Comp", "The ABC_Comp","The test company"]);
  testCompany = res.rows[0];

  const res2 = await db.query(`INSERT INTO invoices 
                              (comp_code, amt) 
                              VALUES ($1, $2) 
                              RETURNING *`,
                              ["ABC_Comp", 23]);
  
  testInvoice = res2.rows[0];
});

afterEach(async () => {
  await db.query(`DELETE FROM invoices`);
  await db.query(`DELETE FROM companies`);
});

afterAll(() => db.end());

/**
 * --------- invoices.js tests -----------------------------
 */

describe("GET /invoices", () => {
  test("Get a list of all invoices", async () => {
    
    const res = await request(app).get("/invoices");
    expect(res.statusCode).toBe(200);
    // console.log(res.body)
    expect(res.body.invoices[0].comp_code).toBe(testInvoice.comp_code);
    expect(10).toBe(10)
  });
});

describe("GET /invoices/:id", () => {
  test("Get an invoice by id", async () => {
    
    const res = await request(app).get(`/invoices/${testInvoice.id}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.invoice.id).toBe(testInvoice.id);
  });
});

describe("POST /invoices/", () => {
  test("POST a new invoice", async () => {
    const testInvoice2 = {"comp_code":testInvoice.comp_code, "amt": 55};
    const res1 = await request(app).post(`/invoices`).send(testInvoice2);
    expect(res1.statusCode).toBe(200);
    expect(res1.body.invoice.comp_code).toBe(testInvoice2.comp_code);
    
    const res2 = await request(app).get(`/invoices/${testInvoice.id}`);
    expect(res2.statusCode).toBe(200);
    expect(res2.body.invoice.id).toBe(testInvoice.id);
  });
});

describe("PUT /invoices/:id", () => {
  test("Update an invoice by id", async () => {
    const testInvoice2 = {"amt": 55};
    const res = await request(app).put(`/invoices/${testInvoice.id}`).send(testInvoice2);
    expect(res.statusCode).toBe(200);
    expect(res.body.invoice.comp_code).toBe(testInvoice.comp_code);
    expect(res.body.invoice.amt).toBe(55);    
  });
});

describe("DELETE /invoices/:id", () => {
  test("Delete an invoice by id", async () => {
    const res = await request(app).delete(`/invoices/${testInvoice.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("deleted");
    
  });
});


/**
 * ------------- companies.js tests -----------------------
 */
describe("GET /companies", () => {
  test("Get a list of all companies", async () => {
    const res = await request(app).get("/companies");
    expect(res.statusCode).toBe(200);
    expect(res.body.companies[0].code).toBe(testCompany.code);
  });
});

describe("GET /companies/:code", () => {
  test("Get a company by code", async () => {
    const res = await request(app).get(`/companies/${testCompany.code}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.companies[0].code).toBe(testCompany.code);
  });
});

describe("POST /companies/", () => {
  test("POST a new company", async () => {
    const testCompany2 = {"code": "EFG_Comp", "name": "The EFG Comp", "description": "The test2 company"};
    const res1 = await request(app).post(`/companies`).send(testCompany2);
    expect(res1.statusCode).toBe(200);
    expect(res1.body.companies[0].code).toBe(testCompany2.code);
    
    const res2 = await request(app).get(`/companies/${testCompany2.code}`);
    expect(res2.statusCode).toBe(200);
    expect(res2.body.companies[0].code).toBe(testCompany2.code);
  });
});

describe("PUT /companies/:code", () => {
  test("Update a company by code", async () => {
    const testCompany2 = {"name": "New Name", "description": "New Test discription", "code": "New_Test_Code"};
    const res = await request(app).put(`/companies/${testCompany.code}`).send(testCompany2);
    expect(res.statusCode).toBe(200);
    expect(res.body.companies[0].description).toBe(testCompany2.description);
  });
});

describe("DELETE /companies/:code", () => {
  test("Delete a company by code", async () => {
    const res = await request(app).delete(`/companies/${testCompany.code}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("deleted");
    
  });
  
});