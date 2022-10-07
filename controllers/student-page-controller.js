var express = require("express");
var router = express.Router();
const User = require("../Models/user");
const Courses = require("../Models/courses");
const Quizes = require("../Models/quiz");
const Skills = require("../Models/skills");
const { calc_percentage } = require("./admin-panel-controller");
const jwt = require("jsonwebtoken");

const main_page = async function (req, res, next) {
  const token = req.cookies.jwt;
  const decoded = await jwt.verify(token, "ODC");
  const userId = decoded.id;
  console.log(userId);
  const user = await User.findById(userId, {
    name: 1,
    email: 1,
    phone: 1,
    skills: 1,
    courses: 1,
    _id: 0,
  });

  const unenrolled_courses = await Courses.find(
    { name: { $nin: user.courses } },
    { name: 1, _id: 1 }
  );
  res.status(201).json({ user, unenrolled_courses });
};

const enroll_course = async (req, res) => {
  const { id } = req.body;
  const course = await Courses.findById(id);
  res.status(201).json({
    course_id: course._id,
    quiz_name: course.Prerequisite_quiz,
  });
};

const take_quiz = async (req, res) => {
  const { quiz_name } = req.body;
  const quiz = await Quizes.findOne(
    { name: quiz_name },
    { questions: { answer: 0 } }
  );
  res.status(201).json(quiz);
};

const submit_quiz = async (req, res) => {
  let { course_id, skill, quiz_id } = req.body;
  let { t: type } = req.query;
  if (skill) {
    const skill_quiz = await Skills.findOne({ name: skill }, { quiz: 1 });
    const quiz = await Quizes.findOne({ name: skill_quiz.quiz });
    quiz_id = quiz._id;
  }
  const { quiz_answers } = req.body;
  let student_answers_map = new Map();
  for (const q of quiz_answers) {
    student_answers_map.set(q.id, q.ans);
  }
  const { questions: right_answers, passing_percentage } =
    await Quizes.findById(quiz_id, {
      questions: { question: 0 },
      name: 0,
      _id: 0,
    });
  let grade = 0;
  for (const ans of right_answers) {
    const student_answer = student_answers_map.get(ans._id.toString());
    if (student_answer === ans.answer) grade++;
  }
  const quiz_result = calc_percentage(grade, right_answers.length);
  if (quiz_result < passing_percentage) {
    res.status(201).json({ message: "Failed to pass the exam" });
    return;
  }

  const token = req.cookies.jwt;
  const decoded = await jwt.verify(token, "ODC");
  const userId = decoded.id;
  const user = await User.findById(userId);

  if (type === "enrollcourse") {
    const course = await Courses.findById(course_id, { name: 1 });
    const updated_user = await User.updateOne(
      { _id: user._id.toString() },
      { $push: { courses: course.name } }
    );
    res.redirect("/student/" + user.id);
  } else {
    const skill_inserted = await Skills.findOne({ name: skill }, { name: 1 });
    const updated_user = await User.updateOne(
      { _id: user._id.toString() },
      { $push: { skills: skill_inserted.name } }
    );
    res.redirect("/student/" + user.id);
  }
};

const add_skill= async (req, res) => {
  const skills = await Skills.find({}, { name: 1 ,quiz:1});
  res.status(201).json(skills);
}
module.exports = { main_page, enroll_course, take_quiz,submit_quiz,add_skill };
