const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");
const userMiddleware = require("../middleware/user");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const newAdmin = new Admin();

  newAdmin.username = username;
  newAdmin.password = password;

  const savedRes = await newAdmin.save();

  if (savedRes) {
    res.status(200).json({ message: "Admin created successfully" });
  } else {
    res
      .status(500)
      .json({ message: "Some issues regarding saving to database" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const course = req.body;
  const username = req.headers.username;

  const newCourse = new Course();
  newCourse.title = course.title;
  newCourse.description = course.description;
  newCourse.price = course.price;
  newCourse.imageLink = course.imageLink;
  newCourse.published = course.published;

  const courseCreated = await newCourse.save();

  const courseUpdatedToAdmin = await Admin.findOneAndUpdate(
    { username: username },
    { $push: { courses: courseCreated } },
    { new: true, useFindAndModify: false }
  );

  if (courseUpdatedToAdmin) {
    res.status(200).json({
      message: "Course created successfully",
      courseId: courseCreated._id.toString(),
    });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const username = req.headers.username;

  const admin = await Admin.findOne({ username: username }).populate(
    "courses"
  ).select('courses');

  if (adminCourses) {
    res.status(200).json({courses: admin.courses});
  }
});

module.exports = router;
