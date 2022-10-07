const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const requireAuth = function (req, res, next) {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "ODC", async (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        const user = await User.findById(decodedToken.id);
        if (
          (req.baseUrl === "/student" && user.type === "admin") ||
          (req.baseUrl === "/admin" && user.type === "student")
        ) {
          res.redirect("/login");
        } else next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = { requireAuth };
