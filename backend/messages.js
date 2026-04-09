const router = require("express").Router();
const Message = require("../models/Message");

router.post("/", async (req, res) => {
  const msg = new Message(req.body);
  await msg.save();
  res.json({ message: "Message received" });
});

module.exports = router;