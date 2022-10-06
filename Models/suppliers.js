const mongoose = require("mongoose");
const { router } = require("../app");

const supplier_schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
  },
  fees: {
    type: Number,
  },
  money_paid: {
    type: Number,
  },
});



module.exports = mongoose.model("supplier", supplier_schema);
