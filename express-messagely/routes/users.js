const express = require("express");
const router = new express.Router();
const { User } = require("../models/user");
const { ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth");

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
router.get("/", ensureLoggedIn, async (req, res, next) => {
  try {
    const results = await User.all();
    return res.json({ users: results });
  } catch (err) {
    return next(err)
  }
});

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
router.get("/:username", ensureCorrectUser, async (req, res, next) => {
  try {
    const result = await User.get(req.params.username);
    return res.json({ user: result });
  } catch (err) {
    return next(err);
  }
});

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get("/:username/to", ensureCorrectUser, async (req, res, next) => {
  try {
    const results = await User.messagesTo(req.params.username);
    return res.json({ messages: results });
  } catch (err) {
    return next(err);
  }
});

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get("/:username/from", ensureCorrectUser, async (req, res, next) => {
  try {
    const results = await User.messagesFrom(req.params.username);
    return res.json({ messages: results });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;