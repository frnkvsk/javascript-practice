const express = require("express");
const router = new express.Router();
const { Message } = require("../models/message");
const { ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth");

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get("/:id", ensureCorrectUser, async (req, res, next) => {
  try {
    const results = Message.get(req.params.id);
    return res.json({ message: results });
  } catch (err) {
    return next(err);
  }
});

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post("/", ensureCorrectUser, async (req, res, next) => {
  try {
    // const { from_username, to_username, body } = req.body;
    const result = Message.create(req.body);
    return res.json({ message: result });
  } catch (err) {
    return next(err);
  }
});

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/
router.post("/:id/read", ensureCorrectUser, async (req, res, next) => {
  try {
    const result = Message.markRead(req.body);
    return res.json({ message: result });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;