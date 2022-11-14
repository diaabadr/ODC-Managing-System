var express = require("express");
var router = express.Router();
const {
  main_page,
  enroll_course,
  take_quiz,
  submit_quiz,
  add_skill,
} = require("../controllers/student-page-controller");

const { requireAuth } = require("../middleware/auth");

/* GET users listing. */
router.get("/:id", requireAuth, main_page);

// enroll specific course
router.post("/enrollcourse/:id", requireAuth, enroll_course);

// take quiz for course or skill
router.post("/takequiz", requireAuth, take_quiz);

// submit your quiz and gain skill or enroll course
router.post("/submitquiz/:id", requireAuth, submit_quiz);

// add skill (for showing available skills)
router.post("/addskill", requireAuth, add_skill);

module.exports = router;
