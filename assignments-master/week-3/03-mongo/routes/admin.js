const mongoose = require("mongoose");
const zod = require("zod");
const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db/index");
const { User } = require("../db/index");
const { Course } = require("../db/index");
const router = Router();

function validateCourseInput(input) {
  const schema = zod.object({
    title: zod.string(),
    description: zod.string(),
    price: zod.number(),
    imagelink: zod.string().url(),
  });
  const response = schema.safeParse(input);
  return response;
}

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  let adminUsername = req.headers.username;
  let adminPassword = req.headers.password;
  if (adminUsername && adminPassword) {
    const existingAdmin = await Admin.findOne({ username: adminUsername });
    if (existingAdmin) {
      res.status(409).json({
        message: "username already exists",
      });
    } else {
      const admin = new Admin({
        username: adminUsername,
        password: adminPassword,
      });
      await admin.save();
      res.status(200).json({
        msg: " new admin registered",
      });
    }
  } else {
    res.json({
      message: "incomplete information",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic

  const Response = validateCourseInput(req.body);
  if (Response.success) {
    let courseArray = await Course.find();
    let courseId = courseArray.length + 1;
    let courseTitle = req.body.title;
    let courseDescription = req.body.description;
    let coursePrice = req.body.price;
    let courseImage = req.body.imagelink;

    const course = new Course({
      Id: courseId,
      title: courseTitle,
      description: courseDescription,
      price: coursePrice,
      imagelink: courseImage,
    });
    await course.save();
    res.status(200).json({
      msg: "course created successfully",
    });
  } else {
    res.json({
      msg: "invalid input",
    });
    console.log("Invalid input:", Response.error.errors);
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const giveCourses = await Course.find();
  res.json(giveCourses);
});

module.exports = router;
