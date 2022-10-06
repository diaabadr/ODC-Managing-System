const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const user_schema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter an email"],
    lowercase: true,
    validate: [isEmail, "Please Enter valid email"],
  },

  name: { type: String, required: true },
  password: {
    type: String,
    required: [true, "Please Enter the Password"],
    minlength: [8, "Min Length:8"],
  },
  phone: { type: String },
  skills: [{ type: String }],
  courses: [{ type:String }],
  type: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  address:{
    type:String,
  },
  military_status:{
    type:String,
  },
});

user_schema.post("save", (docs, next) => {
  console.log("User is Saved");
  next();
});

user_schema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

user_schema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw Error("Incorrect password");
    }
  } else {
    throw Error("User not found");
  }
};
module.exports = mongoose.model("user", user_schema);
