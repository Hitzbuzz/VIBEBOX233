const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String,
  excerpt: String,
  content: String,
  date: String
});

module.exports = mongoose.model("Post", PostSchema);