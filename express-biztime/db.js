/** Database setup for BizTime. */

const { Client } = require("pg");

// database username
const databaseUserName = "";

// database user password
const databaseUserPassword = "";

// port
const port = "";

let DB_URI = `postgres://${ databaseUserName }:${ databaseUserPassword }@localhost:${ port }/`;
if (process.env.NODE_ENV === "test") {
  DB_URI += "biztime_test";
} else {
  DB_URI += "biztime";
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
