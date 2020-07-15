/** Database setup for BizTime. */

const { Client } = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = `postgres://postgres:springboard@localhost:5432/biztime_test`;
} else {
  DB_URI = `postgres://postgres:springboard@localhost:5432/biztime`;
}

let db = new Client({
  connectionString: DB_URI
});

db.connect(
  // function (err){
  // if(err) {
  //   console.log("-----------------------------")
  //   console.log(err);
  // }      
  // else
  //     console.log("Connected!\n"+DB_URI);
// }
);

module.exports = db;
