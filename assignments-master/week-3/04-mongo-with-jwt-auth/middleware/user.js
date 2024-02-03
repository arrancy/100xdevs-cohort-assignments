require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtPassword = process.env.JWT_SECRET;

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  let token = req.headers.authorization.replace("Bearer ", "");
  try {
    await jwt.verify(token, jwtPassword);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "an error occured" });
  }
}

module.exports = userMiddleware;
