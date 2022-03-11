//IMPORT
const mongoose = require("mongoose");
//UserSchema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
//export
module.exports = mongoose.model("User", UserSchema);
