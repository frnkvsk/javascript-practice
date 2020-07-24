/** Common config for bookstore. */

// database username
const databaseUserName = "postgres";

// database user password
const databaseUserPassword = "springboard";

// port
const port = "5432";

let DB_URI = `postgres://${ databaseUserName }:${ databaseUserPassword }@localhost:${ port }/`;

if (process.env.NODE_ENV === "test") {
  DB_URI += "books_test";
} else {
  DB_URI += "books";
}

// let DB_URI = `postgresql://`;

// if (process.env.NODE_ENV === "test") {
//   DB_URI = `${DB_URI}/books_test`;
// } else {
//   DB_URI = process.env.DATABASE_URL || `${DB_URI}/books`;
// }


module.exports = { DB_URI };