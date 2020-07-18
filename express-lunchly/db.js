/** Database for lunchly */

const pg = require("pg");

// database username
<<<<<<< HEAD
const databaseUserName = "postgres";

// database user password
const databaseUserPassword = "springboard";
=======
const databaseUserName = "";

// database user password
const databaseUserPassword = "";
>>>>>>> 5ba64247c4d61d0bef4cbe43644be9f18f721c81

// port
const port = "5432";

let DB_URI = `postgres://${ databaseUserName }:${ databaseUserPassword }@localhost:${ port }/`;
if (process.env.NODE_ENV === "test") {
  DB_URI += "lunchly_test";
} else {
  DB_URI += "lunchly";
}
<<<<<<< HEAD
=======

let db = new pg.Client({
  connectionString: DB_URI
});
>>>>>>> 5ba64247c4d61d0bef4cbe43644be9f18f721c81

let db = new pg.Client({
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
