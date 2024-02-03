const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Admin } = require("../db/index");
const { User } = require("../db/index");
const { Course } = require("../db/index");
const zod = require("zod");
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

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const IdOfCourseToPurchase = parseInt(req.params.courseId);
  const schema = zod.number();
  const response = schema.safeParse(IdOfCourseToPurchase);
  if (response.success) {
    const coursePresent = await Course.findOne({ Id: IdOfCourseToPurchase });
    if (coursePresent) {
      try {
        let token = req.headers.authorization.replace("Bearer ", "");
        const decoded = await jwt.verify(token, jwtPassword);
        let usersUsername = decoded.username;
        const currentUser = await User.findOne({ username: usersUsername });
        currentUser.coursesPurchased.push(IdOfCourseToPurchase);
        await currentUser.save();
        res.status(200).json({ msg: "course purchased successfully" });
      } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "an error occured" });
      }
    } else {
      res.status(400).json({ msg: "invalid input" });
    }
  } else {
    res.status(400).json({ msg: "invalid input" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  try {
    let token = req.headers.authorization.replace("Bearer ", "");
    const decoded = await jwt.verify(token, jwtPassword);
    let usersUsername = decoded.username;
    const currentUser = await User.findOne({ username: usersUsername });
    let coursesPurchasedArray = currentUser.coursesPurchased;
    let newArray = [];
    for (let i = 0; i < coursesPurchasedArray.length; i++) {
      let courseToPush = coursesPurchasedArray[i];
      let courseToPushObject = await Course.findOne({ Id: courseToPush });
      newArray.push(courseToPushObject);
    }
    res.status(200).json(newArray);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "an error occured" });
  }
});

module.exports = router;
