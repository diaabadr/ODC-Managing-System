var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const Courses = require("../Models/courses");
const Skills = require("../Models/skills");
const Quizes = require("../Models/quiz");
const Suppliers = require("../Models/suppliers");
const User = require("../Models/user");
const { requireAuth } = require("../middleware/auth");
const admin_panel_controller = require("../controllers/admin-panel-controller");
const students_data_controller = require("../controllers/students-data-controller");
const courses_data_controller = require("../controllers/courses-data-controller");
const recommendation_system_controller = require("../controllers/recommendation-system-controller");

/* GET users listing. */

// admin panel
router.get("/:id", requireAuth, admin_panel_controller.main_page);

// get new course form data
router.post(
  "/newcourseform",
  requireAuth,
  admin_panel_controller.new_courses_form
);

// feature add course
router.post("/addcourse", requireAuth, admin_panel_controller.add_course);

// get new skill form data (quizes available and )
router.post(
  "/newskillform",
  requireAuth,
  admin_panel_controller.new_skill_form
);

// feature add new skill
router.post("/addskill", requireAuth, admin_panel_controller.add_skill);

// feature add new quiz
router.post("/addquiz", requireAuth, admin_panel_controller.add_quiz);

// get students info
router.post("/students", requireAuth, students_data_controller.students_data);

// get all info of the student
router.post(
  "/studentinfo",
  requireAuth,
  students_data_controller.all_student_info
);

// get courses info
router.post("/courses", requireAuth, courses_data_controller.courses_data);

// adding supplier
router.post("/addsupplier", requireAuth, admin_panel_controller.add_supplier);

// recommend students based on some skills
router.post(
  "/recommend",
  requireAuth,
  recommendation_system_controller.most_matching_students
);

// send mail to student about the job
router.post(
  "/recommendstudent",
  requireAuth,
  recommendation_system_controller.recommend_student
);

module.exports = router;
