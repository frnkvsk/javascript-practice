/** Database for lunchly */

const pg = require("pg");

let db;
if(process.env.NODE_ENV == "test") {
  db = new pg.Client("postgres://postgres:springboard@localhost:5432/lunchly_test");
} else {
  db = new pg.Client("postgres://postgres:springboard@localhost:5432/lunchly");
}
 

db.connect();

module.exports = db;
