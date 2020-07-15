/**
 * I could not get 2 test files to work together.
 * I could get each to work seperately but not both one at a time.
 * Therefore I had to put all of these companies.js tests in the
 * same file as the invoices.js test. 
 * 
 * 
 * So this file is not used.
 * To run this file change the name from 
 * companies.test2.js -> companies.test.js
 *
 */

process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

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
});

afterEach(async () => {
  await db.query(`DELETE FROM invoices`);
  await db.query(`DELETE FROM companies`);
});

afterAll(async () => {
  await db.end();
});

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