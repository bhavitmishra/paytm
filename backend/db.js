const mongoose = require("mongoose");
const { Schema } = require("zod");

mongoose.connect(
  "mongodb+srv://bhavit:bhavit123@cluster0.jdwuk95.mongodb.net/paytm"
);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  salt: String,
});
const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  Account,
};
