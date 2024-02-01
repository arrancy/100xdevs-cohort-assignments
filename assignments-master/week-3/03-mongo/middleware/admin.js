const { Admin } = require("../db/index");
const { User } = require("../db/index");
const { Course } = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  let recievedAdminUsername = req.headers.username;
  let recievedAdminPassword = req.headers.password;
  if (recievedAdminUsername && recievedAdminPassword) {
    const thisAdminExists = await Admin.findOne({
      username: recievedAdminUsername,
      password: recievedAdminPassword,
    });
    if (thisAdminExists) {
      next();
    } else {
      res.status(401).json({
        msg: "wrong credentials",
      });
    }
  } else {
    res.status(409).json({
      msg: "incomplete information",
    });
  }
}

module.exports = adminMiddleware;
