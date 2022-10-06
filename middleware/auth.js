const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const requireAuth = function (req, res, next) {
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(token, "ODC", (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = { requireAuth };
