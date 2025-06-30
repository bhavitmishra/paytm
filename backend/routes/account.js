const express = require("express");
const { Account } = require("../db");
const authMiddleware = require("../middlewares/index.middleware");
const { default: mongoose } = require("mongoose");
const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  console.log(req);

  const account = await Account.findOne({ userId: req.userId });
  if (account) {
    return res.status(200).json({ balance: account.balance });
  }
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const { amount, to } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  const account1 = await Account.findOne({ userId: req.userId }).session(
    session
  );
  if (!account1 || account1.balance < amount) {
    await session.abortTransaction();
    return res
      .status(404)
      .json({ msg: "Account not found OR Insufficient Balance" });
  }
  const account2 = await Account.findOne({ userId: to }).session(session);
  if (!account2) {
    await session.abortTransaction();
    return res.status(404).json({ msg: "Account not found" });
  }
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);
  await session.commitTransaction();
  return res.status(200).json({ msg: "Transfer Successfull" });
});

module.exports = accountRouter;
