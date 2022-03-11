//IMPORTS
const router = require("express").Router();
const User = require("../DataModels/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//REGISTER
router.post("/register", async (req, res) => {
  try {
    //ENCRYPTED PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //NEW USER
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    const savedUser = await newUser.save();
    const { password, ...others } = savedUser._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("The User Has Not Been Found");
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong Password");
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC,
      { expiresIn: "999d" }
    );
    const { password, ...other } = user._doc;
    res.status(200).json({ other, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
