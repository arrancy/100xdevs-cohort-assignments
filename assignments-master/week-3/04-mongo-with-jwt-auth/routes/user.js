const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Admin } = require("../db/index");
const { User } = require("../db/index");
const { Course } = require("../db/index");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtPassword = process.env.JWT_SECRET;

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const userUserName = req.body.username;
  const userPassword = req.body.password;
  const alreadyExists = await User.findOne({ username: userUserName });
  if (alreadyExists) {
    res.status(400).json({
      msg: "username already exists",
    });
  } else {
    const user = new User({ username: userUserName, password: userPassword });
    await user.save();
    res.status(200).json({
      msg: "new user created successfully",
    });
  }
});

router.post("/signin", async (req, res) => {
  // Implement user signin logic
  const userUserName = req.body.username;
  const userPassword = req.body.password;
  const userIsValid = await User.findOne({
    username: userUserName,
    password: userPassword,
  });
  if (userIsValid) {
    try {
      const token = await jwt.sign({ username: userUserName }, jwtPassword);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({
        msg: "an error occured",
      });
      console.log(error);
    }
  }
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  let courseArray = await Course.find();
  res.status(200).json({ courseArray });
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
