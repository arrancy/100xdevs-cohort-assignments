const mongoose = require("mongoose");
require("mongoose-type-url");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://ruturajchondekar:GlLErtjinPtOIZug@cluster0.qxfejac.mongodb.net/courseSellingApp"
);

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
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
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
