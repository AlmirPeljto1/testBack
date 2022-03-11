//IMPORTS
const router = require("express").Router();
const User = require("../DataModels/User");
const Post = require("../DataModels/Post");
const bcrypt = require("bcrypt");
const verifyToken = require("./jwtoken");
//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  if (req.body.userId === req.params.id) {
    //ENCRYPTED PASSWORD
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const { password, ...others } = updatedUser._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You Can Update Only Your Account");
  }
});
//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const userr = await User.findById(req.params.id);
      if (userr) {
        try {
          await Post.deleteMany({ author: User.username });
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("User Has Been Deleted");
        } catch (err) {
          res.status(500).json(err);
        }
      }
    } catch (err) {
      res.status(404).json("User Not Found");
    }
  } else {
    res.status(500).json(err);
  }
});

//EXPORTS
module.exports = router;
