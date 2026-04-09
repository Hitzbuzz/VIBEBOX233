const router = require("express").Router();
const Subscriber = require("../models/Subscriber");

router.post("/", async (req, res) => {
  const sub = new Subscriber({ email: req.body.email });
  await sub.save();
  res.json({ message: "Subscribed" });
});

module.exports = router;