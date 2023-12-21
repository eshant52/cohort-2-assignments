const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User();

  newUser.username = username;
  newUser.password = password;

  const saved = await newUser.save();

  if (saved) {
    res.status(200).json({ message: "User created succussfully" });
  } else {
    res
      .status(500)
      .json({ message: "Account creation failure, retry it again" });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const username = req.body.username;
  const password = req.body.password;

  const getCourse = await Course.find();

  res.status(200).json(getCourse);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;

  const user = await User.findOneAndUpdate(
    { username: req.headers.username },
    { $push: { purchasedCourses: courseId } },
    { new: true, useFindAndModify: false }
  );

  if (user) {
    res.status(200).json({message: "Course purchased successfully"});
  }
  else {
    res.status(404).json({status: "user not found"})
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const purchasedCourses = await User.find({username: req.headers.username});
  console.log(purchasedCourses);
  res.status(200).json(purchasedCourses);
});

module.exports = router;
