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

router.post("/signin", (req, res) => {
  // Implement admin signup logic
});

router.get("/courses", (req, res) => {
  // Implement listing all courses logic
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
