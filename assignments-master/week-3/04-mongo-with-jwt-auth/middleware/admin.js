require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtPassword = process.env.JWT_SECRET;

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  let token = req.headers.authorization;

  if (token) {
    try {
      await jwt.verify(token, jwtPassword);
      next();
    } catch (err) {
      res.status(400).json({
        msg: "invalid token",
      });
      console.log(err);
    }
  } else {
    res.status(400).json({
      msg: "bad request",
    });
  }
}

module.exports = adminMiddleware;
