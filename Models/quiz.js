const mongoose = require("mongoose");

const quiz_schema = mongoose.Schema({
  name: { type: String, unique: true },
  questions: [
    {
      question: String,
      answer: String,
    },
  ],
  passing_percentage:{
    type:Number,
    required:true,
  }
});

module.exports = mongoose.model("quiz", quiz_schema);
