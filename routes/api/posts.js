// ROUTE FILE
const { Router } = require("express");
const router = Router();
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

const { validationResult, check } = require("express-validator");
const postValidator = [check("text", "text is required.").not().isEmpty()];
const auth = require("../../middleware/auth");

// @route POST api/posts
// @desc  Test Route
// @access Private
router.post("/", [auth, postValidator], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPost = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };
    const post = await Post.create(newPost);
    return res.json(post);
  } catch (err) {
    console.error(err.message);
    return res.status(500).status({ msg: "Server Error" });
  }
});

// @route GET api/posts
// @desc  Get all posts
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.json(posts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).status({ msg: "Server Error" });
  }
});

// @route GET api/posts/:id
// @desc  Get post by id
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const post = await Post.findbyId(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "404 Not found" });
    }

    return res.json(posts);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "404 Not found" });
    }
    return res.status(500).status({ msg: "Server Error" });
  }
});

// @route DELETE api/posts/:id
// @desc  Delete post by id
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findbyId(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "404 Not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "401 Unauthorized" });
    }
    await post.remove();

    return res.json({ msg: "Post deleted." });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "404 Not found" });
    }
    return res.status(500).status({ msg: "Server Error" });
  }
});
module.exports = router;
