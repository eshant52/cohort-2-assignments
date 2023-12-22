const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

  const username = req.headers.username;
  const password = req.headers.password;

  const getAdmin = await Admin.findOne({ username: username });

  if (getAdmin.password === password && getAdmin) {
    next();
  } else {
    res.status(404).json({ message: "Password did not matched" });
  }
}

module.exports = adminMiddleware;
