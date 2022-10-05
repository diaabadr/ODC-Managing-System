const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1/ODC-System-database",
  { useNewUrlParser: true },
  (error) => {
    if (error) console.log(error);
    else console.log("Database Connected Successfully");
  }
);

const Suppliers = require("./Models/suppliers");

// const sup = [
//   new Suppliers({
//     name: "instant",
//     fees: 12500,
//     money_paid: 5000,
//   }),
//   new Suppliers({
//     name: "instant",
//     fees: 15000,
//     money_paid: 2000,
//   }),
//   new Suppliers({
//     name: "instant",
//     fees: 8000,
//     money_paid: 6000,
//   }),
// ];

// sup.forEach((supl) => {
//   supl.save((error, res) => {
//     console.log(res);
//   });
// });

const users = require("./Models/user");
users.updateOne(
  { name: "diaa" },
  { $push: { courses: "deep learning" } }
)
const user = new users({
  name: "Diaa Badr",
  password: "diaa1234",
  email: "diaabadr82@gmail.com",
  gender: "male",
  type: "admin",
});

// user.save((error, res) => {
//  if(error)
//  console.log(error)
//  else
//  console.log(res);
// });
// const date = new Date();
// date.setMonth(date.getMonth() + 1);
// console.log(date);
// const Course = require("./Models/courses");
// const courses = new Course({
//   name: "data structure",
//   Prerequisite_quiz: 1,
//   skills: null,
//   start_date: new Date(),
//   end_date: date,
//   supplier: "633cc8d946d061fec6368075",
// });
// courses.save((error, res) => console.log(res));
// Course.deleteMany((err, res) => console.log(res));


