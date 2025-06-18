const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("hello Ji");
});

module.exports = userRouter;
