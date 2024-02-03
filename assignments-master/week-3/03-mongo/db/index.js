const mongoose = require("mongoose");
require("mongoose-type-url");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL);

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
  coursesPurchased: {
    type: [Number],
    default: [],
  },
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  Id: Number,
  title: String,
  description: String,
  price: Number,
  imagelink: mongoose.SchemaTypes.Url,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
