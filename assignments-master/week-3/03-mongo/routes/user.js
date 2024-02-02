const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Admin } = require("../db/index");
const { User } = require("../db/index");
const { Course } = require("../db/index");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  let usersUsername = req.headers.username;

  const userExists = await User.findOne({
    username: usersUsername,
  });
  if (userExists) {
    res.status(409).json({
      msg: "user already exists",
    });
  } else {
    const user = new User({ username: usersUsername, password: usersPassword });
    await user.save();
    res.status(200).json({
      msg: "user created successfully",
    });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const giveCoursesForUser = await Course.find();
  res.json(giveCoursesForUser);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  let courseToPurchase = parseInt(req.params.courseId);
  const coursePresent = await Course.findOne({ Id: courseToPurchase });
  if (coursePresent) {
    const currentUser = await User.findOne({
      username: req.headers.username,
      password: req.headers.password,
    });
    currentUser.coursesPurchased.push(courseToPurchase);
    await currentUser.save();
    res.status(200).json({
      msg: "course purchased successfully",
    });
  } else {
    res.status(400).json({
      msg: "invalid course Id",
    });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  let usersUsername = req.headers.username;
  let currentUser = await User.findOne({ username: usersUsername });
  let currentUsersCourses = currentUser.coursesPurchased;
  let newArray = [];
  for (let i = 0; i < currentUsersCourses.length; i++) {
    let courseToPush = currentUsersCourses[i];
    let courseObject = await Course.findOne({ Id: courseToPush });
    newArray.push(courseObject);
  }
  res.status(200).json(newArray);
});

module.exports = router;
