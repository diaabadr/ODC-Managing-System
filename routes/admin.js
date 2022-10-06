var express = require("express");
var router = express.Router();
const Courses = require("../Models/courses");
const Skills = require("../Models/skills");
const Quizes = require("../Models/quiz");
const Suppliers = require("../Models/suppliers");
const User = require("../Models/user");
const admin_panel_controller = require("../controllers/admin-panel-controller");
const students_data_controller = require("../controllers/students-data-controller");
const courses_data_controller = require("../controllers/courses-data-controller");
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

// get students info
router.post("/students", students_data_controller.students_data);

// get all info of the student
router.post("/studentinfo", students_data_controller.all_student_info);

// get courses info
router.post("/courses", courses_data_controller.courses_data);

// adding supplier
router.post("/addsupplier", admin_panel_controller.add_supplier);

router.post("/recommend", async (req, res) => {
  let {p:page}=req.query;
  if(!page)
  page=1;
  const limit=5;
  const skip=(page-1)*limit;
  const { skills } = req.body;
  const recommended_students = await User.find({
    $and: [{ type: "student" }, { skills: { $all: skills } }],
  })
    .sort({ skills: 1 }).skip(skip)
    .limit(limit);
  res.status(201).json(recommended_students);
});


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'diaabadr82@gmail.com',
    pass: '01119322620'
  }
});

router.post('/recommendstudent',async (req,res)=>{
  const id=req.body.id;
  const {email}=await User.findById(id,{email:1});
  var mailOptions = {
    from: 'diaabadr82@gmail.com',
    to: 'diaabadr355@gmail.com',
    subject: 'ODC Job',
    text: 'That was easy!'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
  
    }
  });
  res.status(201).json(email);

})

module.exports = router;
