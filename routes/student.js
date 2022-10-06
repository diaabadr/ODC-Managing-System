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

router.post("/enrollcourse", requireAuth, enroll_course);

router.post("/takequiz", requireAuth, take_quiz);

router.post("/submitquiz", requireAuth, submit_quiz);

router.post("/addskill", requireAuth, add_skill);

module.exports = router;
