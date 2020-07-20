// ROUTE FILE
const { Router } = require("express");
const router = Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/Profile");
const Posts = require("../../models/Post");

const request = require("request");
const { githubClientId, githubClientSecret } = require("../../config");
const { validationResult, check } = require("express-validator");
const Post = require("../../models/Post");
const profileValidator = [
  check("status", "Status is required.").not().isEmpty(),
  check("skills", "Skills is required.").not().isEmpty(),
];
const expeirenceValidator = [
  check("title", "Title is required").not().isEmpty(),
  check("company", "Company is required").not().isEmpty(),
  check("from", "From date is required").not().isEmpty(),
];
const educationValidator = [
  check("school", "School is required").not().isEmpty(),
  check("degree", "Degree is required").not().isEmpty(),
  check("from", "From date is required").not().isEmpty(),
  check("fieldOfStudy", "Field Of Study is required").not().isEmpty(),
];

// @route GET api/profiles/me
// @desc  Get single profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "No profile found." });
    }
    return res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error." });
  }
});
// @route GET api/profiles/user/:user_id
// @desc  Get all profiles
// @access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "No profile found." });
    }
    return res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "No profile found." });
    }
    return res.status(500).json({ msg: "Server Error." });
  }
});
// @route GET api/profiles
// @desc  Get all profiles
// @access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    return res.json(profiles);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// @route POST api/profiles
// @desc  Create or update profile
// @access Private
router.post("/", [auth, profileValidator], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    linkedin,
    instagram,
  } = req.body;
  // Build Profile Object
  const profileFeilds = {};
  if (company) profileFeilds.company = company;
  if (website) profileFeilds.website = website;
  if (status) profileFeilds.status = status;
  if (location) profileFeilds.location = location;
  if (bio) profileFeilds.bio = bio;
  if (githubusername) profileFeilds.githubusername = githubusername;
  if (skills) {
    profileFeilds.skills = skills.split(",").map((skill) => skill.trim());
  }

  // Build Social Object
  profileFeilds.social = {};
  if (youtube) profileFeilds.social.youtube = youtube;
  if (facebook) profileFeilds.social.facebook = facebook;
  if (twitter) profileFeilds.social.twitter = twitter;
  if (linkedin) profileFeilds.social.linkedin = linkedin;
  if (instagram) profileFeilds.social.instagram = instagram;
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    // If profile then update
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFeilds },
        { new: true }
      );
      return res.json(profile);
    }
    // Create if not found
    profile = new Profile(profileFeilds);
    profile = await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).status({ msg: "Server Error" });
  }
});



// @route PUT api/profiles/experience
// @desc  Update Experience
// @access Private
router.put("/experience", [auth, expeirenceValidator], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { company, title, location, from, to, current, description } = req.body;
  const newExp = {
    company,
    title,
    location,
    from,
    to,
    current,
    description,
  };
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    console.log(req.user.id);
    profile.experience.unshift(newExp);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).status({ msg: "Server Error" });
  }
});

// @route PUT api/profiles/education
// @desc  Update Experience
// @access Private
router.put("/education", [auth, educationValidator], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
  } = req.body;
  const newEdu = {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
  };
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    console.log(profile);
    profile.education.unshift(newEdu);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).status({ msg: "Server Error" });
  }
});

// @route DELETE api/profiles/me
// @desc  Delete User profile.
// @access Private
router.delete("/", auth, async (req, res) => {

  try {
    // Remove Posts
    await Post.deleteMany({user: req.user.id})

    // Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    return res.json({ msg: "Profile Deleted" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).status({ msg: "Server Error" });
  }
});

// @route DELETE api/profiles/experience
// @desc  Delete experirence
// @access Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).status({ msg: "Server Error" });
  }
});

// @route DELETE api/profiles/education/:edu_id
// @desc  Delete experirence
// @access Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).status({ msg: "Server Error" });
  }
});

// @route GET api/profiles/github/:username
// @desc  Github with username
// @access Private
router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (err, response, body) => {
      if (err) console.error(err.message);
      if (response.statusCode !== 200) {
        return res.status(404).status({ msg: "User not found" });
      }
      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).status({ msg: "Server Error" });
  }
});
module.exports = router;
