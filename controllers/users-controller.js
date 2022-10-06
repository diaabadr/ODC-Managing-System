const jwt = require("jsonwebtoken");
const User = require("../Models/user.js");
const day = 1000 * 24 * 60 * 60;
const createToken = function (id) {
  return jwt.sign({ id }, "ODC", { expiresIn: 3 * day });
};

const signup = async function (req, res) {
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
    user.password = null;
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000)
      res.status(404).json({ error: "This email already registered" });
    else
      res.status(404).json({
        error:
          error.errors?.email?.properties.message ||
          error.errors?.password?.properties.message,
      });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: 3 * day });

    if (user.type === "student") {
      res.redirect("/student/" + user._id);
    } else {
      res.redirect("/admin/" + user._id);
    }
  } catch (errors) {
    res.status(404).json({ error: errors.message });
  }
};

module.exports = { signup, login };
