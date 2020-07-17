/** Start server for Lunchly. */

const app = require("./app");

app.listen(5432, function() {
  console.log("listening on 5432");
});
