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
    return await User.find(
      {
        $and: [{ type: "student" }, { courses: course }, { gender: gender }],
      },
      { name: 1, email: 1, _id: 0, courses: 1, phone: 1, gender: 1 }
    )
      .skip(skip)
      .limit(limit);
  } else if (course === "c" && gender === "g") {
    return await User.find(
      { type: "student" },
      { name: 1, email: 1, courses: 1, phone: 1, gender: 1 }
    )
      .skip(skip)
      .limit(limit);
  } else if (course === "c") {
    return await User.find(
      {
        $and: [{ type: "student" }, { gender: gender }],
      },
      { name: 1, email: 1, _id: 0, courses: 1, phone: 1, gender: 1 }
    )
      .skip(skip)
      .limit(limit);
  } else {
    return await User.find(
      {
        $and: [{ type: "student" }, { courses: course }],
      },
      { name: 1, email: 1, _id: 0, courses: 1, phone: 1, gender: 1 }
    )
      .skip(skip)
      .limit(limit);
  }
};

const all_student_info = async (req, res) => {
  const {id} = req.body;
  const student = await User.findOne({ _id: id }, { password: 0 });
  res.status(201).json(student);
};

module.exports = { students_data, all_student_info };
