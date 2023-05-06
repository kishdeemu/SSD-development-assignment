const Worker = require("../models/worker");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const HttpError = require("../models/http-error");

const addNewWorker = async (req, res, next) => {
  let encryptedPassword;
  try {
    encryptedPassword = await bcrypt.hash(req.body.password, 12);
  } catch (err) {
    const error = new HttpError("Could not hash password, Try again.", 500);
    return next(error);
  }

  const createNewWorker = new Worker({
    username: req.body.username,
    password: encryptedPassword,
  });

  try {
    await createNewWorker.save();
    res.status(201).json({ success: true, data: createNewWorker });
  } catch (error) {
    return next(new HttpError("Databse error occured", 500));
  }
};

const workerLogin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Username and password is empty" });
  }
  let foundWorker;
  try {
    foundWorker = await Worker.findOne({ username: username });
    if (!foundWorker) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, foundWorker.password);
    if (matchPassword) {
      //creating jwt token
      const accessToken = jwt.sign(
        { username: foundWorker.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      const refreshToken = jwt.sign(
        { username: foundWorker.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      foundWorker.refreshToken = refreshToken;
      try {
        await foundWorker.save();
      } catch (error) {
        return next(error);
        //return next(new HttpError("Databse error occured", 500));
      }
      //sending refreshtoken and accesstoken to frontend
      res.cookie("jwt", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ role: "worker", accessToken: accessToken });
    } else {
      res.status(401).json({ message: "password mismatch" });
    }
  } catch (error) {
    return error;
  }
};

const saveMsg = async (req, res, next) => {
  const { username, message } = req.body;
  if (!username || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Username or message is empty" });
  }
  try {
    let foundWorker = await Worker.findOne({ username: username });
    if (!foundWorker) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    const updatedMessages = [...foundWorker.savedMsgs, message];

    foundWorker.savedMsgs = updatedMessages;
    try {
      await foundWorker.save();
      res.json({ foundWorker });
    } catch (error) {
      return next(new HttpError("Databse error occured", 500));
    }
  } catch (err) {
    return err;
  }
};

exports.addNewWorker = addNewWorker;
exports.workerLogin = workerLogin;
exports.saveMsg = saveMsg;
