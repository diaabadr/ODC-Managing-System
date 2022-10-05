const Courses = require("../Models/courses");
const Skills = require("../Models/skills");
const Quizes = require("../Models/quiz");
const Suppliers = require("../Models/suppliers");
const User = require("../Models/user");

const main_page = async function (req, res, next) {
  const dashboard_data = await get_dashboard_data();
  res.status(201).json({ data: dashboard_data });
};

const new_courses_form = async (req, res) => {
  // get available skills
  const skills = await Skills.find({}, { name: 1, _id: 0 });
  // get available quizes
  const quizes = await get_available_quizes();
  const suppliers = await Suppliers.find({}, { name: 1, _id: 0 });
  suppliers_names = [];
  suppliers.forEach((supplier) => {
    suppliers_names.push(supplier.name);
  });
  res.status(201).json({ skills, quizes, suppliers_names });
};

const add_course = async (req, res) => {
  let { name, prerequisite_quiz, skills, start_date, end_date, supplier } =
    req.body;
  try {
    start_date = new Date(start_date);
    end_date = new Date(end_date);
    // check date guard class
    if (end_date < new Date()) throw new Error("End date expired");

    // get supplier id
    const supplier_id = await Suppliers.findOne({ name: supplier }, { _id: 1 });
    supplier = supplier_id._id;

    const new_course = new Courses({
      name,
      Prerequisite_quiz: prerequisite_quiz,
      skills,
      start_date,
      end_date,
      supplier,
    });
    const course = await new_course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const new_skill_form = async (req, res) => {
  // get quizes available
  const quizes = await get_available_quizes();
  let quizes_names = [];
  quizes.forEach((quiz) => {
    quizes_names.push(quiz.name);
  });

  res.status(201).json(quizes_names);
};

const add_skill = async (req, res) => {
  const { name, quiz } = req.body;
  const new_skill = new Skills({ name, quiz });
  try {
    const saved_skill = await new_skill.save();

    res.status(201).json(saved_skill);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const add_quiz=async (req, res) => {
    const quiz = new Quizes(req.body);
    try {
      const quiz_ = await quiz.save();
      res.status(201).json(quiz_);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

const get_available_quizes = async function () {
  return await Quizes.find({}, { name: 1, _id: 1 });
};

/*********************************************************** */
const get_ODC_money_data = async function () {
    let suppliers_data = await Suppliers.find({}, { _id: 0, __v: 0 });
    let total_money_paid = 0;
    let total_amount = 0;
  
    suppliers_data.forEach((supplier, i) => {
      // casting the object into javascript object
      let supplier_obj = supplier.toObject();
  
      total_money_paid += supplier.money_paid;
      total_amount += supplier.fees;
  
      supplier_obj.pay_percentage = calc_percentage(
        supplier.money_paid,
        supplier.fees
      );
  
      suppliers_data[i] = supplier_obj;
    });
  
    const paid_percentage = calc_percentage(total_money_paid, total_amount);
    const to_pay = total_amount - total_money_paid;
  
    return [
      suppliers_data,
      {
        total_amount,
        total_money_paid,
        paid_percentage,
        to_pay,
      },
    ];
  };


  /*********************************************************** */
const get_dashboard_data = async function () {
    // money details object
    const money_details = await get_ODC_money_data();
  
    //getting students number
    const number_of_students = await User.find({ type: "student" }).count();
    // getting courses number
    const number_of_courses = await Courses.find({}).count();
  
    const shown_courses = await get_shown_courses_data();
  
    return shown_courses;
  };
  const get_shown_courses_data = async function () {
    let shown_courses = await Courses.find(
      { end_date: { $gt: new Date() } },
      { name: 1, start_date: 1, end_date: 1, _id: 0, supplier: 1 }
    ).limit(4);
    let i = 0;
    for (const course of shown_courses) {
      let course_object = course.toObject();
      if (new Date() >= course.end_date) course_object.progress = 100;
      else {
        let period = course.end_date - course.start_date;
        const finished_period = new Date() - course.start_date;
        course_object.progress = calc_percentage(finished_period, period);
      }
  
      course_object.start_date = format_date(course.start_date);
      course_object.end_date = format_date(course.end_date);
  
      const supplier_name = await Suppliers.findOne(
        { _id: course.supplier },
        { name: 1, _id: 0 }
      );
      course_object.supplier = supplier_name.name;
      shown_courses[i] = course_object;
      i++;
    }
  
    return shown_courses;
  };


  const format_date = function (date) {
    return date.getUTCDate() + " " + month[date.getMonth()];
  };

  /*********************************************************** */
const calc_percentage = function (amount, total) {
    return ((amount * 100) / total).toFixed(0);
  };

module.exports = {
  new_courses_form,
  add_course,
  new_skill_form,
  add_skill,
  main_page,
  add_quiz
};
