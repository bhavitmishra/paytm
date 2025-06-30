const JWT_SECRET = require("../config.js");
const jwt = require("jsonwebtoken");
const { User } = require("../db.js");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET);

  const fuser = await User.findOne({ _id: decoded.userid });
  if (!fuser) {
    return res
      .status(404)
      .json({ msg: "user not found with corresponding token" });
  }

  if (req.body.username == fuser.username) {
    console.log("control reached here");
    req.userId = decoded.userid;
    next();
  } else return res.status(404).json({ msg: "invalid T" });
};

module.exports = authMiddleware;
