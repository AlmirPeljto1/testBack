//IMPORT
const mongoose = require("mongoose");
//PostSchema
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
    },
  },
  { timestamps: true }
);
//export
module.exports = mongoose.model("Post", PostSchema);
