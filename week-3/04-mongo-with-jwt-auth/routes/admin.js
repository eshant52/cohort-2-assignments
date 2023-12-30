const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin, User, Course } = require("../db");
const { JWT_PASSWORD } = require("../secrete");

const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  try {
    const username = req.body.username;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      username: username,
      password: hashedPassword,
    });

    res.status(200).json({ message: "Admin created successfully" });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: "something went wrong, try it again" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  try {
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.findOne({ username: username });

    // authentication
    const isAuthenticated = bcrypt.compare(password, admin?.password);

    // if true create token
    if (isAuthenticated) {
      const payload = {
        id: admin._id.toString(),
        username: username,
      };
      const token = jwt.sign(payload, JWT_PASSWORD, { expiresIn: "1h" });
      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "wrong credential" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "admin not found" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  try {
    const payload = req.payload;

    const course = await Course.create({
      title: req.body?.title,
      description: req.body?.description,
      price: req.body?.price,
      imageLink: req.body?.imageLink,
      published: req.body?.published || false,
    });

    const admin = await Admin.findByIdAndUpdate(
      payload.id,
      { $push: { courses: course } },
      { new: true }
    );

    res.status(200).json({
      message: "Course created successfully",
      courseId: course._id.toString(),
    });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: "Something went wrong try it again" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const payload = req.payload;

    const admin = await Admin.findById(payload.id)
      .populate("courses")
      .select("courses");

    if (admin) {
      res.status(200).json({ courses: admin.courses });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
