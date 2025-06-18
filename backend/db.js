const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://bhavit:bhavit123@cluster0.jdwuk95.mongodb.net/paytm"
);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
