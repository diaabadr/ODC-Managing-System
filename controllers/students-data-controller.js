const Courses = require("../Models/courses");
const Skills = require("../Models/skills");
const Quizes = require("../Models/quiz");
const Suppliers = require("../Models/suppliers");
const User = require("../Models/user");

const students_data = async (req, res) => {
  let { course, gender } = req.query;
  console.log(req.query);
  if (course === undefined) course = "c";
  if (gender === undefined) gender = "g";
  // limit per page
  const limit = 10;
  let { p: page } = req.query;
  if (!page) page = 1;

  // skip some courses based on the page
  const skip = (page - 1) * limit;

  // check for filters
  const users = await filter(skip, course, gender, limit);
  res.status(201).json({ page, users });
};

const filter = async function (skip, course, gender, limit) {
    if (course !== "c" && gender !== "g") {
      return await User.find({
        $and: [{ type: "student" }, { courses: course }, { gender: gender }],
      })
        .skip(skip)
        .limit(limit);
    } else if (course === "c" && gender === "g") {
      return await User.find({ type: "student" }).skip(skip).limit(limit);
    } else if (course === "c") {
      return await User.find({
        $and: [{ type: "student" }, { gender: gender }],
      })
        .skip(skip)
        .limit(limit);
    } else {
      return await User.find({
        $and: [{ type: "student" }, { courses: course }],
      })
        .skip(skip)
        .limit(limit);
    }
  };

module.exports = { students_data };
