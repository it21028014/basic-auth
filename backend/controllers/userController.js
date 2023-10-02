const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asynchandler = require("express-async-handler");
const User = require("../models/usermodel");

const registerUser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  //check user exists
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash the passwrod
  const salt = await bcrypt.genSalt(10);
  const hashpw = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashpw,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: genrateToekn(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Inavlid user data");
  }
  //   res.json({ message: "User Added" });
});

const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: genrateToekn(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  //   res.json({ message: "Login user" });
});

const getMe = asynchandler(async (req, res) => {
  res.json({ message: "Get user" });
});

const genrateToekn = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
