const Manager = require("../models/manager");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const adminLogin = async (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    return res
      .status(400)
      .json({ success: false, message: "Username and password is empty" });
  }
  const accessToken = jwt.sign(
    { username: username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30s" }
  );
  return res.status(200).json({accessToken});
};


exports.adminLogin = adminLogin;

