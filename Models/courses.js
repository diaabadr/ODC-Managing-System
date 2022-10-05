const mongoose = require("mongoose");
const { router } = require("../app");

const courses_schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  Prerequisite_quiz: {
    type: String,
  },
  skills: [ { type: String } ],
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  supplier: {
    type: String,
  },
});

module.exports = mongoose.model("courses", courses_schema);
