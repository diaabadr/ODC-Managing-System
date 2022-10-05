const mongoose = require("mongoose");

const skills_schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
  },
  quiz: {
    type: String,
  },
});

module.exports = mongoose.model("skills", skills_schema);
