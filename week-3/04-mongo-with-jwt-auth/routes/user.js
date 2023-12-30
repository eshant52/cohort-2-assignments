const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const bycrpt = require("bcrypt");
const { User, Course } = require("../db");
const { JWT_PASSWORD } = require("../secrete");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  try {
    const username = req.body.username;
    const password = req.body.password;

    const hashedPassword = await bycrpt.hash(password, 10);

    const user = await User.create({
      username: username,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: "retry again", error: err.message });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username });

    const isAuthenticated = bycrpt.compare(password, user.password);

    if (isAuthenticated) {
      const payload = {
        id: user._id.toString(),
        username: username,
      };
      const token = jwt.sign(payload, JWT_PASSWORD);

      res.setHeader("Authorization", `Bearer ${token}`);

      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Wrong credential, enter correct one" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "User not found" });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  try {
    const courses = await Course.find({ published: true });
    res.status(200).json({ courses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  try {
    const payload = req.payload;
    const courseId = req.params.courseId;

    // check whether courseid exist or not
    const course = await Course.findById(courseId);

    // if exist then purchase update
    const user = await User.findById(payload.id);

    // check whether user have already purchased a course.
    const purchasedCourses = user.purchasedCourses;

    const isPurchased = purchasedCourses.find(
      (id) => id.toString() === courseId
    );

    if (isPurchased) {
      res.status(422).json({ message: "Already purchased" });
    } else {
      purchasedCourses.push(course._id);
      user.purchasedCourses = purchasedCourses;
      await user.save();
      res.status(200).json({ message: "Course purchased successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  try {
    const payload = req.payload;

    const user = await User.findById(payload.id)
      .populate("purchasedCourses")
      .select("purchasedCourses");

    res.status(200).json({ purchasedCourses: user.purchasedCourses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
