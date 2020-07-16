const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");
const slugify = require('slugify');

// GET /companies_industries
//   Return info on companies_industries: like {companies_industries: [{comp_code, indy_code}, ...]}
router.get("/", async (req, res, next) => {
  try {
    const results = await db.query(`SELECT * FROM companies_industries`);
    return res.json({"companies_industries": results.rows});
  } catch(err) {
    return next(err);
  }
});

// GET /companies_industries/[comp_code]
//   Returns obj on given indy_code.
//   If comp_code cannot be found, returns 404.
//   Returns {companies_industries: {comp_comp_code, indy_code}}
router.get("/:comp_code", async (req, res, next) => {
  try {
    let comp_code = req.params.comp_code;
    const results = await db.query(`SELECT * FROM companies_industries
                                    WHERE comp_code = $1`,
                                    [slugify(comp_code, "_")]);
    if(!results.rows.length) throw new ExpressError(`No such comp_code: ${comp_code}`, 404);

    return res.json({"companies_industries": results.rows[0]});
  } catch(err) {
    return next(err);
  }
});

// POST /companies_industries
//   Adds an companies_industries.
//   Needs to be passed in JSON body of: {comp_code, indy_code}
//   Returns: {companies_industries: {comp_code, indy_code}}
router.post("/", async (req, res, next) => {
  try {
    let {comp_code, indy_code} = req.body;
    const results = await db.query(`INSERT INTO companies_industries
                                    (comp_code, indy_code)
                                    VALUES ($1, $2)
                                    RETURNING *`,
                                    [slugify(comp_code, "_"), slugify(indy_code, "_")]);
    return res.json({"companies_industries": results.rows[0]});
  } catch(err) {
    return next(err);
  }
});

// PUT /companies_industries/[comp_code]
//   Updates an companies_industries.
//   If comp_code cannot be found, returns a 404.
//   Needs to be passed in a JSON body of {comp_code, indy_code}
//   Returns: {companies_industries: {comp_code, indy_code}}
router.put("/:comp_code", async (req, res, next) => {
  try {
    let comp_code = req.params.comp_code;
    let {indy_code} = req.body;
    const results = await db.query(`UPDATE companies_industries
                                    SET indy_code = $1
                                    where comp_code = $2
                                    RETURNING *`,
                                    [slugify(indy_code, "_"), slugify(comp_code, "_")]);
    if(!results.rows.length) throw new ExpressError(`No such comp_code: ${comp_code}`, 404);
    return res.json({"companies_industries": results.rows[0]});
  } catch(err) {
    return next(err);
  }
});

// DELETE /companies_industries/[comp_code]
//   Deletes an indy_code.
//   If indy_code cannot be found, returns a 404.
//   Returns: {status: "deleted"}
router.delete("/:comp_code", async (req, res, next) => {
  try {
    let comp_code = req.params.comp_code;
    const results = await db.query(`DELETE FROM companies_industries
                                    WHERE comp_code = $1
                                    RETURNING comp_code`,
                                    [slugify(comp_code, "_")]);
    if(!results.rows.length) throw new ExpressError(`No such comp_code: ${comp_code}`, 404);
    return res.json({"status": "deleted"});
  } catch(err) {
    return next(err);
  }
});

module.exports = router;