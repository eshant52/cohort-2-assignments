const { get } = require("mongoose");
const { User } = require("../db/index");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

  const username = req.headers.username;
  const password = req.headers.password;

  const getUser = await User.findOne({ username: username });

  if (getUser.password === password) {
    next();
  } else {
    res.status(404).json({ message: "password did not matched" });
  }
}

module.exports = userMiddleware;
