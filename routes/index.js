var express = require("express");
var router = express.Router();
const User = require("../Models/user.js");
const users_controller = require("../controllers/users-controller");
const app = require("../app.js");

const day = 1000 * 24 * 60 * 60;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(201).json({ message: "successful connection" });
});

router.get("/login", (req, res) => {
  res.status(201).json({ message: "please login" });
});


router.post("/signup", users_controller.signup);

router.post("/login", users_controller.login);

router.get("/logout", (req, res) => {
  res.cookie("jwt", " ", { maxAge: 1 });
  res.redirect("/login");
});

module.exports = router;
