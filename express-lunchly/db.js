/** Database for lunchly */

const pg = require("pg");

// database username
const databaseUserName = "postgres";

// database user password
const databaseUserPassword = "springboard";

// port
const port = "5432";

let DB_URI = `postgres://${ databaseUserName }:${ databaseUserPassword }@localhost:${ port }/`;
if (process.env.NODE_ENV === "test") {
  DB_URI += "lunchly_test";
} else {
  DB_URI += "lunchly";
}

let db = new pg.Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;
