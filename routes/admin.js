var express = require("express");
var router = express.Router();
const Courses = require("../Models/courses");
const Skills = require("../Models/skills");
const Quizes = require("../Models/quiz");
const Suppliers = require("../Models/suppliers");
const User = require("../Models/user");
const admin_panel_controller = require("../controllers/admin-panel-controller");
const students_data_controller = require("../controllers/students-data-controller");
/* GET users listing. */

// admin panel
router.get("/:id", admin_panel_controller.main_page);

// get new course form data
router.post("/newcourseform", admin_panel_controller.new_courses_form);

// feature add course
router.post("/addcourse", admin_panel_controller.add_course);

// get new skill form data (quizes available and )
router.post("/newskillform", admin_panel_controller.new_skill_form);

// feature add new skill
router.post("/addskill", admin_panel_controller.add_skill);

// feature add new quiz
router.post("/addquiz", admin_panel_controller.add_quiz);

// get students data
router.post("/students",students_data_controller.students_data);



module.exports = router;
