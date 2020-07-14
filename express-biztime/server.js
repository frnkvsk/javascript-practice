/** Server startup for BizTime. */


const app = require("./app");


app.listen(5432, function () {
  console.log("Listening on 5432");
});