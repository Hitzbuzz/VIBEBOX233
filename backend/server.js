require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const postRoutes = require("./routes/posts");
const subscriberRoutes = require("./routes/subscribers");
const messageRoutes = require("./routes/messages");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"));

app.use("/api/posts", postRoutes);
app.use("/api/subscribe", subscriberRoutes);
app.use("/api/messages", messageRoutes);

app.listen(5000, ()=>console.log("Server running on port 5000"));