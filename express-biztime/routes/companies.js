const express = require("express");
const router = new express.Router();

const db = require("../db");

// biztime=# select * from companies
// biztime-# ;
//  code  |      name      |  description
// -------+----------------+---------------
//  apple | Apple Computer | Maker of OSX.
//  ibm   | IBM            | Big blue.

// GET /companies
//   Returns list of companies, like {companies: [{code, name}, ...]}
router.get("/companies", async function (req, res, next) {
  try {
    console.log("--------------------------------------")
    // const results = await db.query(`SELECT * FROM companies`);
    // return res.json(results.rows);
    return res.json({companies: [{code, name}]})
  } catch(err) {
    return next(err);
  }
});

// GET /companies/[code]
//   Return obj of company: {company: {code, name, description}}
router.get("/companies/:code", async (req, res, next) => {
  // try {

  // } catch(err) {
  //   return next(err);
  // }
});

//   If the company given cannot be found, this should return a 404 status response.

// POST /companies
//   Adds a company.
//   Needs to be given JSON like: {code, name, description}
//   Returns obj of new company: {company: {code, name, description}}
router.post("/companies", async (req, res, next) => {
  // try {

  // } catch(err) {
  //   return next(err);
  // }
});

// PUT /companies/[code]
//   Edit existing company.
//   Should return 404 if company cannot be found.
//   Needs to be given JSON like: {name, description}
//   Returns update company object: {company: {code, name, description}}
router.put("/companies/:code", async (req, res, next) => {
  // try {

  // } catch(err) {
  //   return next(err);
  // }
});

// DELETE /companies/[code]
//   Deletes company.
//   Should return 404 if company cannot be found.
//   Returns {status: "deleted"}
router.delete("/companies/:code", async (req, res, next) => {
  // try {

  // } catch(err) {
  //   return next(err);
  // }
});

module.exports = router;
