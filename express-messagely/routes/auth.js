const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const ExpressError = require("../expressError");
const db = require("../db");
const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require("../config");
const { User } = require("../models/user");
/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ExpressError("Username and password required", 400);
    }
    const result = await db.query(
      `SELECT password FROM users WHERE username = $1`,
      [username]
    );
    let user = result.rows[0];

    if(user) {
      if (await bcrypt.compare(password, user.password == true)) {
        let token = jwt.sign({ username }, SECRET_KEY);
        await User.updateLoginTimestamp(username);
        return res.json({ token });
      }
    }
    throw new ExpressError("Invalid username/password", 400);
  } catch (err) {
    return next(err);
  }
});

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await User.register(username, password);
    await User.updateLoginTimestamp(username);
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});