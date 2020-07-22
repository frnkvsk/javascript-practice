/** User class for message.ly */
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const db = require("../db");

/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) { 
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const resp = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, phone, join_at)
      VALUES ($1, $2, $3, $4, $5, current_timestamp)
      RETURNING username, password, first_name, last_name, phone`,
      [username, hashedPassword, first_name, last_name, phone]
    );
    return resp.rows[0];
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) { 
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const resp = await db.query(
      `SELECT password FROM users WHERE username = $1`,
      [username]
    );
    return resp.rows.length && bcrypt.compare(password, resp.rows[0].password)
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) { 
    const timestamp = Date.now();
    const resp = await db.query(
      `UPDATE users SET last_login_at = current_timestamp WHERE username = $1`,
      [username]
    );

  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() { 
    const resp = await db.query(
      `SELECT username, first_name, last_name, phone FROM users`
    );
    return resp.rows;
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) { 
    const resp = await db.query(
      `SELECT username, first_name, last_name, phone, join_at, last_login_at 
      FROM users 
      WHERE username = $1`,
      [username]
    );
    return resp.rows[0];
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) { 
    const resp = await db.query(
      `SELECT m.id, m.body, m.sent_at, m.read_at, 
        json_build_object('username', u.username,'first_name', u.first_name, 
        'last_name', u.last_name, 'phone', u.phone) to_user
      FROM messages m
      JOIN users u
      ON u.username = m.to_username
      AND m.from_username = $1`,
      [username]
    );
    return resp.rows;
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {id, first_name, last_name, phone}
   */

  static async messagesTo(username) { 
    const resp = await db.query(
      `SELECT m.id, m.from_username from_user, m.body, m.sent_at, m.read_at, 
        json_build_object('username', u.username,'first_name', u.first_name, 
        'last_name', u.last_name, 'phone', u.phone) from_user
      FROM messages m
      JOIN users u
      ON u.username = m.from_username
      AND m.to_username = $1`,
      [username]
    );
    return resp.rows;
  }
}


module.exports = { User };