const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin } = require("../db/index");
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

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
  const course = req.body;
  const username = req.headers.username;
  const courseCreated = Admin.findOneAndUpdate(
    { username: username },
    { $push: { courses: course } },
    { new: true, useFindAndModify: false }
  );
  if (courseCreated) {
    res.status(200).json({message: "Course created successfully", courseId: courseCreated._id});
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const username = req.headers.username;
  
  const adminCourses = await Admin.findOne({username: username});

  if (adminCourses) {
    res.status(200).json(adminCourses.courses);
  }
});

module.exports = router;
