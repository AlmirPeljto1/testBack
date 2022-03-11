//IMPORTS
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
//RouteImport
const authRoute = require("./Routes/auth");
const userRoute = require("./Routes/user");
const postRoute = require("./Routes/post");

//ENV
dotenv.config();
//SERVER
const app = express();
app.use(express.json());
app.listen(process.env.PORT || 8000, () => {
  try {
    console.log("SERVER IS ON");
  } catch (err) {
    res.status(500).json(err);
  }
});
//CORS ENABLE BROWSER TO SENT REQ
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
//ALLOW PUBLIC IMAGES
app.use("/Images", express.static(path.join(__dirname, "/Images")));
//DATABASE MONGOOSE
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("MongoDB IS ON"))
  .catch((err) => console.log(err));
//STORAGE MULTER FOR IMAGES
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
//UPLOAD MULTER
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been updated");
});

//ROUTES
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
