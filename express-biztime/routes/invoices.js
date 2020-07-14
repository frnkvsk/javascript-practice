const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");

// GET /invoices
//   Return info on invoices: like {invoices: [{id, comp_code}, ...]}
router.get("/", async (req, res, next) => {
  try {
    const results = await db.query(`SELECT * FROM invoices`);
    return res.json({"invoices": results.rows});
  } catch(err) {
    return next(err);
  }
});

// GET /invoices/[id]
//   Returns obj on given invoice.
//   If invoice cannot be found, returns 404.
//   Returns {invoice: {id, amt, paid, add_date, paid_date, company: {code, name, description}}}
router.get("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    const results = await db.query(`SELECT * FROM invoices, companies
                                    WHERE id=$1`,
                                    [id]);
    if(!results.rows.length) throw new ExpressError(`No such invoice: ${id}`, 404);

    let row = results.rows[0];
    return res.json({"invoice": {"id": row.id, "amt": row.id, "paid": row.paid, "add_date": row.add_date, "paid_date": row.paid_date}, "company": {"code": row.code, "name": row.code, "description": row.description}});
  } catch(err) {
    return next(err);
  }
});

// POST /invoices
//   Adds an invoice.
//   Needs to be passed in JSON body of: {comp_code, amt}
//   Returns: {invoice: {id, comp_code, amt, paid, add_date, paid_date}}
router.post("/", async (req, res, next) => {
  try {
    let {comp_code, amt} = req.body;
    const results = await db.query(`INSERT INTO invoices
                                    (comp_code, amt)
                                    VALUES ($1, $2)
                                    RETURNING *`,
                                    [comp_code, amt]);
    return res.json({"invoice": results.rows[0]});
  } catch(err) {
    return next(err);
  }
});

// PUT /invoices/[id]
//   Updates an invoice.
//   If invoice cannot be found, returns a 404.
//   Needs to be passed in a JSON body of {amt}
//   Returns: {invoice: {id, comp_code, amt, paid, add_date, paid_date}}
router.put("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let {amt} = req.body;
    const results = await db.query(`UPDATE invoices
                                    SET amt=$1
                                    RETURNING *`,
                                    [amt]);
    if(!results.rows.length) throw new ExpressError(`No such invoice: ${id}`, 404);
    return res.json({"invoice": results.rows[0]});
  } catch(err) {
    return next(err);
  }
});

// DELETE /invoices/[id]
//   Deletes an invoice.
//   If invoice cannot be found, returns a 404.
//   Returns: {status: "deleted"}
router.delete("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    const results = await db.query(`DELETE FROM invoices
                                    WHERE id=$1
                                    RETURNING id`,
                                    [id]);
    if(!results.rows.length) throw new ExpressError(`No such invoice: ${id}`, 404);
    return res.json({"status": "deleted"});
  } catch(err) {
    return next(err);
  }
});

module.exports = router;