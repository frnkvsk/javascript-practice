/** Common config for message.ly */

// read .env files and make environmental variables

require("dotenv").config();

// database username
const databaseUserName = "postgres";

// database user password
const databaseUserPassword = "springboard";

// port
const port = "5432";

let DB_URI = `postgres://${ databaseUserName }:${ databaseUserPassword }@localhost:${ port }/`;

if(process.env.NODE_ENV === "test") {
  DB_URI += "messagely_test";
} else {
  DB_URI += "messagely";
}

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const BCRYPT_WORK_FACTOR = 12;


module.exports = {
  DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
};