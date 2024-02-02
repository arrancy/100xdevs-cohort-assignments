const { User } = require("../db/index");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  let userUsername = req.headers.username;
  let userPassword = req.headers.password;
  if (userUsername && userPassword) {
    const isCorrect = await User.findOne({
      username: userUsername,
      password: userPassword,
    });
    if (isCorrect) {
      next();
    } else {
      res.status(400).json({
        msg: "invalid credentials",
      });
    }
  } else {
    res.status(400).json({
      msg: "incomplete information",
    });
  }
}

module.exports = userMiddleware;
