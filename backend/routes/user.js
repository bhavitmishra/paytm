const express = require("express");
const { User, Account } = require("../db");
const zod = require("zod");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middlewares/index.middleware.js");
userRouter.get("/", authMiddleware, async (req, res) => {
  const user = await User.find({});
  console.log(user.username);

  return res.json({
    User: user.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    })),
  });
});
const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
userRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.json({
      msg: "Enter correct values",
    });
  }
  const exist = await User.findOne({ username: body.username });
  if (exist) {
    res.status(411).send("Already Exists");
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);
  body.password = hashedPassword;
  body.salt = salt;

  const dbuser = await User.create(body);
  const token = jwt.sign({ userid: dbuser._id }, JWT_SECRET);
  const userId = dbuser._id;
  Account.create({ userId, balance: 1 + Math.random() * 10000 });
  return res.json({
    msg: " User Successfully created",
    token: token,
  });
});
const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});
userRouter.post("/signin", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.json({
      msg: "Please Enter Valid UserName or Password",
    });
  }
  const user = await User.findOne({
    username: body.username,
  });
  if (!user) {
    return res.status(404).json({ msg: "Incorrect username" });
  }
  const pass = await bcrypt.hash(body.password, user.salt);
  if (pass === user.password) {
    return res.status(200).json({ msg: "signed in successfully" });
  } else return res.status(401).json({ msg: "Incorrect password" });
});

const updateBodySchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBodySchema.safeParse(req.body);
  console.log("control is in updation state");

  if (!success) {
    return res.status(411).json({ msg: "Error while updating Information" });
  }
  const user = await User.findOneAndUpdate({ _id: req.userId }, req.body);
  res.json({
    msg: "Successfully Updated",
    user,
  });
});

module.exports = userRouter;
