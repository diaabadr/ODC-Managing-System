var express = require("express");
var router = express.Router();
const { requireAuth } = require("../middleware/auth");
const {
  main_page,
  new_courses_form,
  new_skill_form,
  add_course,
  add_skill,
  add_quiz,
  add_supplier,
  load_suppliers,
  pay_supplier,
} = require("../controllers/admin-panel-controller");
const {
  students_data,
  all_student_info,
} = require("../controllers/students-data-controller");
const { courses_data } = require("../controllers/courses-data-controller");
const {
  most_matching_students,
  recommend_student,
} = require("../controllers/recommendation-system-controller");

/* GET users listing. */

// admin panel
router.get("/:id", requireAuth, main_page);

// get new course form data (for prerequists quiz)
router.get("/newcourseform", requireAuth, new_courses_form);

// add course
router.post("/addcourse", requireAuth, add_course);

// get new skill form data (quizes available and )
router.get("/newskillform", requireAuth, new_skill_form);

// feature add new skill
router.post("/addskill", requireAuth, add_skill);

// feature add new quiz
router.post("/addquiz", requireAuth, add_quiz);

// get students info
router.get("/students", requireAuth, students_data);

// get all info of the student
router.get("/studentinfo/:id", requireAuth, all_student_info);

// get courses info
router.get("/courses", requireAuth, courses_data);

// adding supplier
router.post("/addsupplier", requireAuth, add_supplier);

// form for suppliers
router.get("/loadsuppliers", requireAuth, load_suppliers);

// pay money for a supplier
router.post("/paysupplier", requireAuth, pay_supplier);

// recommend students based on some skills
router.post("/recommend", requireAuth, most_matching_students);

// send mail to student about the job
router.get("/recommendstudent/:id", requireAuth, recommend_student);

module.exports = router;
