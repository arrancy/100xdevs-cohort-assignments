const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db/index");
const { User } = require("../db/index");
const { Course } = require("../db/index");
const router = Router();
const jwt = require("jsonwebtoken");
const jwtPassword = process.env.JWT_SECRET;
const zod = require("zod");
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
  let adminUsername = req.body.username;
  let adminPassword = req.body.password;
  const alreadyExists = await Admin.findOne({ username: adminUsername });
  if (alreadyExists) {
    res.status(409).json({
      msg: "username already in use",
    });
  } else {
    const admin = new Admin({
      username: adminUsername,
      password: adminPassword,
    });
    await admin.save();
    res.status(200).json({
      msg: "admin created successfully",
    });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const adminUsername = req.body.username;
  const adminPassword = req.body.password;
  if (adminUsername && adminPassword) {
    let adminCredentialsCorrect = await Admin.findOne({
      username: adminUsername,
      password: adminPassword,
    });
    if (adminCredentialsCorrect) {
      try {
        const token = await jwt.sign({ username: adminUsername }, jwtPassword);
        res.status(200).json({
          token,
        });
      } catch (error) {
        res.status(400).json({
          msg: "an error occured",
        });
        console.log(error);
      }
    } else {
      res.status(400).json({
        msg: "invalid credentials",
      });
    }
  } else {
    res.status(400).json({
      msg: "incomplete credentials",
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
  let courseArray = await Course.find();
  res.status(200).json({ courseArray });
});

module.exports = router;
