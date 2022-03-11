//imports
const router = require("express").Router();
const Post = require("../DataModels/Post");
//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author === req.body.author) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(404).json("You Can Update Only Your Post");
      }
    } else {
      res.status(404).json("You Can Update Only Your Post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//UPDATE COMMENT
router.put("/comment/:id", async (req, res) => {
  try {
    const updateComment = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: req.body,
        },
      },
      { new: true }
    );
    res.status(200).json(updateComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author === req.body.author) {
      try {
        await post.delete();
        res.status(200).json("Post Has Been Deleted");
      } catch (err) {
        res.status(404).json("You Can Delete Only Your Post");
      }
    } else {
      res.status(404).json("You Can Delete Only Your Post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET POSTS
router.get("/", async (req, res) => {
  try {
    //GET POSTS
    const getPosts = await Post.find();
    res.status(200).json(getPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//EXPORTS
module.exports = router;
