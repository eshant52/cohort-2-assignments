const jwt = require("jsonwebtoken");
const { JWT_PASSWORD } = require("../secrete");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  try {
    const bearerToken = req.headers.authorization;
    const jwtToken = bearerToken.split(" ")[1];

    const payload = jwt.verify(jwtToken, JWT_PASSWORD);

    req.payload = payload;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "You are not Authorized" });
  }
}

module.exports = adminMiddleware;
