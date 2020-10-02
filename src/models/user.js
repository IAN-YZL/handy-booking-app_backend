const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    default: "firstName ",
  },
  lastName: {
    type: String,
    default: "lastName ",
  },
  avatar: {
    type: String,
    default: "avatar ",
  },
  createdAt: {
    type: Date,
    select: false,
  },
  customers: { type: [{ type: String, ref: "Customer" }], select: false },
  tradies: { type: [{ type: String, ref: "Tradie" }], select: false },
});

schema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};
schema.methods.validatePassword = async function (password) {
   const validatePassword = await bcrypt.compare(password, this.password);
  return validatePassword;
};

const Model = mongoose.model("User", schema);

module.exports = Model;
