const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");
const slugify = require('slugify');

// GET /industries
//   Return info on industries: like {industries: [{code, industry}, ...]}
router.get("/", async (req, res, next) => {
  try {
    const results = await db.query(`SELECT * FROM industries`);
    return res.json({"industries": results.rows});
  } catch(err) {
    return next(err);
  }
});

// GET /industries/[id]
//   Returns obj on given industry.
//   If industry cannot be found, returns 404.
//   Returns {industry: {code, industry}}
router.get("/:code", async (req, res, next) => {
  try {
    let code = req.params.code;
    const results = await db.query(`SELECT * FROM industries
                                    WHERE code = $1`,
                                    [code]);
    if(!results.rows.length) throw new ExpressError(`No such industry: ${code}`, 404);

    return res.json({"industry": results.rows[0]});
  } catch(err) {
    return next(err);
  }
});

// POST /industries
//   Adds an industry.
//   Needs to be passed in JSON body of: {code, industry}
//   Returns: {industry: {code, industry}}
router.post("/", async (req, res, next) => {
  try {
    let {code, industry} = req.body;
    const results = await db.query(`INSERT INTO industries
                                    (code, industry)
                                    VALUES ($1, $2)
                                    RETURNING *`,
                                    [slugify(code, "_"), industry]);
    return res.json({"industry": results.rows[0]});
  } catch(err) {
    return next(err);
  }
});

// PUT /industries/[code]
//   Updates an industry.
//   If industry cannot be found, returns a 404.
//   Needs to be passed in a JSON body of {industry}
//   Returns: {industry: {code, industry}}
router.put("/:code", async (req, res, next) => {
  try {
    let code = req.params.code;
    let {industry} = req.body;
    const results = await db.query(`UPDATE industries
                                    SET industry = $1
                                    where code = $2
                                    RETURNING *`,
                                    [industry, code]);
    if(!results.rows.length) throw new ExpressError(`No such industry: ${code}`, 404);
    return res.json({"industry": results.rows[0]});
  } catch(err) {
    return next(err);
  }
});

// DELETE /industries/[code]
//   Deletes an industry.
//   If industry cannot be found, returns a 404.
//   Returns: {status: "deleted"}
router.delete("/:code", async (req, res, next) => {
  try {
    let code = req.params.code;
    const results = await db.query(`DELETE FROM industries
                                    WHERE code=$1
                                    RETURNING code`,
                                    [code]);
    if(!results.rows.length) throw new ExpressError(`No such industry: ${code}`, 404);
    return res.json({"status": "deleted"});
  } catch(err) {
    return next(err);
  }
});

module.exports = router;