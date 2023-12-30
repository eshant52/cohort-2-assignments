const jwt = require("jsonwebtoken");
const { JWT_PASSWORD } = require("../secrete");
function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  try {
    const bearerToken = req.headers.Authorization;
    const jwtToken = bearerToken.split(" ")[1];

    const payload = jwt.verify(jwtToken, JWT_PASSWORD);
    
    req.payload = payload;

    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({message: "you are not authorized"});
  }
}

module.exports = userMiddleware;
