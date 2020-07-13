const express = require("express");
const router = new express.Router();

const db = require("../db");

// biztime=# select * from invoices;
//  id | comp_code | amt | paid |  add_date  | paid_date
// ----+-----------+-----+------+------------+------------
//   1 | apple     | 100 | f    | 2020-07-13 |
//   2 | apple     | 200 | f    | 2020-07-13 |
//   3 | apple     | 300 | t    | 2020-07-13 | 2018-01-01
//   4 | ibm       | 400 | f    | 2020-07-13 |
// GET /invoices
//   Return info on invoices: like {invoices: [{id, comp_code}, ...]}
router.get("/invoices", async (req, res, next) => {
  // try {

  // } catch(err) {
  //   return next(err);
  // }
});

// GET /invoices/[id]
//   Returns obj on given invoice.
//   If invoice cannot be found, returns 404.
//   Returns {invoice: {id, amt, paid, add_date, paid_date, company: {code, name, description}}}
router.get("/invoices/:id", async (req, res, next) => {
  // try {

  // } catch(err) {
  //   return next(err);
  // }
});

// POST /invoices
//   Adds an invoice.
//   Needs to be passed in JSON body of: {comp_code, amt}
//   Returns: {invoice: {id, comp_code, amt, paid, add_date, paid_date}}
router.post("/invoices", async (req, res, next) => {
  // try {

  // } catch(err) {
  //   return next(err);
  // }
});

// PUT /invoices/[id]
//   Updates an invoice.
//   If invoice cannot be found, returns a 404.
//   Needs to be passed in a JSON body of {amt}
//   Returns: {invoice: {id, comp_code, amt, paid, add_date, paid_date}}
router.put("/invoices/:id", async (req, res, next) => {
  // try {

  // } catch(err) {
  //   return next(err);
  // }
});

// DELETE /invoices/[id]
//   Deletes an invoice.
//   If invoice cannot be found, returns a 404.
//   Returns: {status: "deleted"}
router.delete("/invoices/:id", async (req, res, next) => {
  // try {

  // } catch(err) {
  //   return next(err);
  // }
});


// Also, one route from the previous part should be updated:

// GET /companies/[code]
// Return obj of company: {company: {code, name, description, invoices: [id, ...]}}

// If the company given cannot be found, this should return a 404 status response.

module.exports = router;