const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { Schema, Types } = require("mongoose");

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

  // get all published courses
  const courses = await Course.find({ published: true });

  res.status(200).json(courses);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;

  const user = await User.findOne({ username: username });

  const purchasedCourses = user.purchasedCourses;

  // check whether course is already purchased or not
  const isPresent = purchasedCourses.find(
    (value) => value.toString() === courseId
  );

  if (!isPresent) {
    // const users = await User.findById(
    //   { username: req.headers.username },
    //   { $push: { purchasedCourses: courseId } },
    //   { new: true, useFindAndModify: true }
    // );
    purchasedCourses.push(courseId);

    user.purchasedCourses = purchasedCourses;

    const usersaved = await user.save();

    if (usersaved) {
      res.status(200).json({ message: "Course purchased successfully" });
    } else {
      res.status(404).json({ status: "user not found" });
    }
  } else {
    res.status(200).json({message: "Course is alread purchased"});
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await User.findOne({ username: req.headers.username }).populate(
    "purchasedCourses"
  );
  res.status(200).json({ purchasedCourses: user.purchasedCourses });
});

module.exports = router;
