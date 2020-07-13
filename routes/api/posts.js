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
// @access Public
router.post("/", auth, async (req, res) => {
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
        user: req.user.id
      };
      const post = await Post.create(newPost)
      return res.json(post);
  } catch (err) {
    console.error(err.message);
    return res.status(500).status({ msg: "Server Error" });
  }

});

module.exports = router;
