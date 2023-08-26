const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
var UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "firstname is required"],
      minLength: [4, "First name should we at Least "],
    },
    lastname: {
      type: String,
      required: [true, "lastname is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      minLength: [3, "City should we atleast 3 character long"],
    },
    contact: {
      type: String,
      required: [true, "contact is required"],
      maxLength: [10, "Contact should not exceed 10 character"],
      minLength: [10, "Contact should we atleast 10 character long"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "others"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      select: false,
      maxLength: [15, "password should not exceed from 15 character"],
      minLength: [6, "password should aleast 6 character"],
      //match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,"Please fill a valid password"]
    },
    role: {
      type: String,
      default: "BASIC",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bycrypt.genSaltSync(10);
  this.password = bycrypt.hashSync(this.password, salt);
});

UserSchema.methods.comparepassword=function(password){
  return bycrypt.compareSync(password,this.password);
};
UserSchema.methods.generatedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
const User = mongoose.model("user", UserSchema);

module.exports = User;

