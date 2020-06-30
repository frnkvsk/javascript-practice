/** Express Routing Exercise */
const ExpressError = require("./expressError").ExpressError;
const express = require('express');
const Mean = require("./mean").Mean;
const Median = require("./median").Median;
const Mode = require("./mode").Mode;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/mean/:nums", (req, res, next) => {
  let result;
  try{
    const mean = new Mean(req.params.nums);
    result = mean.getMean();
  } catch (e) {
    return next(e);
  }
  return res.json({operation: "mean", value: result});
});

app.get("/median/:nums", (req, res, next) => {
  let result;
  try{
    const median = new Median(req.params.nums);
    result = median.getMedian();
  } catch (e) {
    return next(e);
  } 

  return res.json({operation: "median", value: result});
});

app.get("/mode/:nums", (req, res, next) => {
  let result;
  try{
    const mode = new Mode(req.params.nums);
    result = mode.getMode();
  } catch (e) {
    return next(e);
  }

  return res.json({operation: "mode", value: result});
});

app.get("/all/:nums", (req, res, next) => {
  let result;
  try{
    const all = new All(req.params.nums);
    result = all.getAll();
  } catch (e) {
    return next(e);
  }

  return res.json({response: result});
});

// 400 handler
app.use((err, req, res, next) => {

  let status = err.status;
  let message = err.message;
  
  return res.status(status).json({
    error: {message, status}
  });

});

/** Start server on port 3000 */
app.listen(3000, () => {
  console.log('Server started on port 3000.');
});
