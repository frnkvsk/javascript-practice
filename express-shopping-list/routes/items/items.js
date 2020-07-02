const express = require("express");
const router = new express.Router();
const ExpressError = require("../../expressError");
// const items = require("../../fakeDb");
const DataStore = require("../../data/data")

// GET /items - this should render a list of shopping items.
// Here is what a response looks like:
// [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]
router.get("/", async (req, res) => {
  const data = await DataStore.get();
  res.json({ data });
});

// POST /items - this route should accept JSON data and add it to the shopping list.
// Here is what a sample request/response looks like:
// {“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}
router.post("/items", async (req, res, next) => {
  try {
    if(!req.body.name) throw new ExpressError("Name is required", 400);
    if(!req.body.price) throw new ExpressError("Price is required", 400);
    const newItem = { name: req.body.name, price: req.body.price };
    await DataStore.post(newItem);
    return res.status(201).json( { "added": newItem } );
  } catch(e) {
    next(e);
  }
});


// GET /items/:name - this route should display a single item’s name and price.
// Here is what a sample response looks like:
// {“name”: “popsicle”, “price”: 1.45}
router.get("/items/:name", async (req, res) => {
  const foundItem = await DataStore.get(req.params.name)
  if(foundItem == undefined) {
    throw new ExpressError("Item not found", 404);
  }
  res.json(foundItem)
});


// PATCH /items/:name - this route should modify a single item’s name and/or price.
// Here is what a sample request/response looks like:
// {“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}
router.patch("/items/:name", async (req, res) => {
  const foundItem = await DataStore.patch(req.params.name, req.body.name, req.body.price)
  if(!foundItem) {
    throw new ExpressError("Item not found", 404);
  }
  res.json({ "updated": foundItem });
});


// DELETE /items/:name - this route should allow you to delete a specific item from the array.
// Here is what a sample response looks like:
// {message: “Deleted”}
router.delete("/items/:name", async (req, res) => {
  const foundItem = await DataStore.delete(req.params.name);
  if(!foundItem) {
    throw new ExpressError("Item not found", 404);
  }
  res.json({ message: "Deleted" });
});

module.exports = router;