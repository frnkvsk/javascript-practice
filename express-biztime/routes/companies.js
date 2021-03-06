const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");
const slugify = require('slugify');

// GET /companies
//   Returns list of companies, like {companies: [{code, name}, ...]}
router.get("/", async (req, res, next) => {
  try {
    const results = 
      await db.query(`SELECT c.code c_code, c.name, c.description, i.code i_code, i.industry 
                      FROM companies c
                      LEFT JOIN companies_industries ci  ON c.code = ci.comp_code
                      LEFT JOIN industries i ON ci.indy_code = i.code;`);
    return res.json({"companies": results.rows});
  } catch(err) {
    return next(err);
  }
});

// GET /companies/[code]
//   Return obj of company: {company: {code, name, description}}
router.get("/:code", async (req, res, next) => {
  try {
    let code = req.params.code;
    const results = 
      await db.query(`SELECT c.code c_code, c.name, c.description, i.code i_code, i.industry 
                      FROM companies c
                      LEFT JOIN companies_industries ci  ON ci.comp_code = c.code
                      LEFT JOIN industries i ON ci.indy_code = i.code
                      WHERE c.code = $1`,[slugify(code, "_")]);
    if(!results.rows.length) throw new ExpressError(`No such company: ${slugify(code, "_")}`, 404);
    return res.json({"companies": results.rows});
  } catch(err) {
    return next(err);
  }
});

// POST /companies
//   Adds a company.
//   Needs to be given JSON like: {code, name, description}
//   Returns obj of new company: {company: {code, name, description}}
router.post("/", async (req, res, next) => {
  try {
    let {code, name, description} = req.body;
    const results = await db.query(`INSERT INTO companies (code, name, description) 
                                    VALUES ($1,$2,$3) 
                                    RETURNING code, name, description`,
                                    [slugify(code, "_"), name, description]);
    return res.json({"companies": results.rows});
  } catch(err) {
    return next(err);
  }
});

// PUT /companies/[code]
//   Edit existing company.
//   Should return 404 if company cannot be found.
//   Needs to be given JSON like: {name, description}
//   Returns update company object: {company: {code, name, description}}
router.put("/:code", async (req, res, next) => {
  try {
    let code = req.params.code;
    let {name, description} = req.body;
    const results = await db.query(`UPDATE companies
                                    SET name=$1, description=$2
                                    WHERE code=$3
                                    RETURNING code, name, description`,
                                    [name, description, slugify(code, "_")]);
    if(!results.rows.length) throw new ExpressError(`No such company: ${code}`, 404);
    return res.json({"companies": results.rows});
  } catch(err) {
    return next(err);
  }
});

// DELETE /companies/[code]
//   Deletes company.
//   Should return 404 if company cannot be found.
//   Returns {status: "deleted"}
router.delete("/:code", async (req, res, next) => {
  try {
    let code = req.params.code;
    const results = await db.query(`DELETE FROM companies
                                    WHERE code=$1
                                    RETURNING code`,
                                    [slugify(code, "_")]);
    if(!results.rows.length) throw new ExpressError(`No such company: ${code}`, 404);
    return res.json({"status": "deleted"});
  } catch(err) {
    return next(err);
  }
});

module.exports = router;
