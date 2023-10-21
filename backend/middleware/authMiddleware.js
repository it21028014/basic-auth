const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");
const User = require("../models/usermodel");

const protect = asynchandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //gett token from the header
      token = req.headers.authorization.split(" ")[1];

      //verify tiken
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, NO TOKEN");
  }
});

module.exports = { protect };
