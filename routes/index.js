var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const app = require("../app");
const User = require("../Models/user.js");
const Courses = require("../Models/courses");
const Skills = require("../Models/skills");
const Quizes = require("../Models/quiz");
const Suppliers = require("../Models/suppliers");
const day = 1000 * 24 * 60 * 60;
const createToken = function (id) {
  return jwt.sign({ id }, "ODC", { expiresIn: 3 * day });
};
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signup", async function (req, res) {
  console.log(req.body);
  const { name, email, password, phone, gender, military_status, address } =
    req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
      phone,
      type: "student",
      gender,
      military_status,
      address,
    });
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: 3 * day });
    res.status(201).json(user.name);
  } catch (error) {
    if (error.code === 11000)
      res.status(404).json({ error: "This email already registered" });
    else
      res.status(404).json({
        error:
          error.errors.email?.properties.message ||
          error.errors.password?.properties.message ||
          "No errors",
      });
  }
});

router.get("/login", (req) => {});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: 3 * day });

    // const { page, size } = req.query;
    // console.log(page, size);
    if (user.type === "student") {
      user.password=null;
      res.status(201).json(user);
    } else {
      res.redirect("/admin/" + user._id);
    }
  } catch (errors) {
    res.status(404).json({ error: errors.message });
  }
});

module.exports = router;
