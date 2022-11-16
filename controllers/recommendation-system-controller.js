const User = require("../Models/user");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "diaabadr82@gmail.com",
    pass: "jmplagpwspgowhxl",
  },
});

const most_matching_students = async (req, res) => {
  let { p: page } = req.query;
  if (!page) page = 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  const { skills } = req.body;
  const recommended_students = await User.find(
    {
      $and: [{ type: "student" }, { skills: { $all: skills } }],
    },
    { password: 0 }
  )
    .sort({ skills: 1 })
    .skip(skip)
    .limit(limit);
  res.status(201).json(recommended_students);
};

const recommend_student = async (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  const { email } = await User.findById(id, { email: 1 });
  var mailOptions = {
    from: "diaabadr82@gmail.com",
    to: email,
    subject: "ODC Job Recommendation",
    text: text,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
    }
  });
  res.status(201).json(email);
};

module.exports = { most_matching_students, recommend_student };
