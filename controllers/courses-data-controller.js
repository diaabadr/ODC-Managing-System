const Courses = require("../Models/courses");
const Skills = require("../Models/skills");
const Quizes = require("../Models/quiz");
const Suppliers = require("../Models/suppliers");
const User = require("../Models/user");

const courses_data = async (req, res) => {
  const limit = 10;
  let { p: page } = req.query;
  if (!page) page = 1;

  // skip some courses based on the page
  const skip = (page - 1) * limit;
  const courses = await Courses.find().skip(skip).limit(limit);
  res.status(201).json({ page, courses });
};

module.exports = { courses_data };
