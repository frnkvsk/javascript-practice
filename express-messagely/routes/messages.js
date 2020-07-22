const express = require("express");
const router = new express.Router();
const Message = require("../models/message");
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

router.get("/:id", ensureLoggedIn, async (req, res, next) => {
  try {
    const results = await Message.get(req.params.id);
    if(req.user.username == results.from_user.username || 
       req.user.username == results.to_user.username) {
        return res.json({ message: results });
    }
    return next({ status: 401, message: "Unauthorized" });
  } catch (err) {
    return next(err);
  }
});

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 * Make sure that the user creating message matches the from_username
 **/
router.post("/", ensureLoggedIn, async (req, res, next) => {
  
  try {
    if(req.user.username == req.body.data.from_username) {
      const result = Message.create(req.body.data);
      return res.json({ message: result });
    }
    return next({ status: 401, message: "Unauthorized" });
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
router.post("/:id/read", ensureLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Message.get(id);
    if(req.user.username == result.to_user.username) {
      const result = Message.markRead(id);
      return res.json({ message: result });
    }
    return next({ status: 401, message: "Unauthorized" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;