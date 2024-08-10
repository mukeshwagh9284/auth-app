require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// console.log("PORT from env:", process.env.PORT); // Debugging line
// console.log("JWT_SECRET from env:", process.env.JWT_SECRET); // Debugging line
app.listen(PORT, () => {
  console.log("server running");
});

const cors = require("cors");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

const userRouter = require("./router");
app.use("/user", userRouter);
