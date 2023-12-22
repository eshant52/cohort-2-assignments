const mongoose = require("mongoose");
const { MONGO_URI } = require("../secrete");

// Connect to MongoDB
mongoose.connect(MONGO_URI).then(() => {
  console.log("Mongodb connected");
});

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      unique: true,
    },
  ],
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  purchasedCourses: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      },
    ],
    validate: {
      validator: function (value) {
        return new Set(value).size === value.length;
      },
      message: "Duplicate course",
    },
  },
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: String,
  description: String,
  price: String,
  imageLink: String,
  published: Boolean,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
