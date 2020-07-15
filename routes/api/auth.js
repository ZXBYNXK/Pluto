// ROUTE FILE
const { Router } = require("express");
const router = Router();

//Bcryptjs
const bcrypt = require("bcryptjs");

// Jwt
const jwt = require("jsonwebtoken");
const { jwtSec } = require("../../config");

// Express Validator
const { check, validationResult } = require("express-validator");

const userValidator = [
  check("email", "Email is required.").isEmail(),
  check("password", "Passoword is should be more than 6 charachters.").exists(),
];
// Models
const User = require("../../models/User");

// Middleware
const auth = require("../../middleware/auth");

// @route GET api/auth
// @desc  Get user data by token
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route POST api/auth
// @desc  Login Route
// @access Public
router.post("/", userValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    // See if user exists
    let user = await User.findOne({ email });

    // If user does not exist, then there is no way to login.
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // See if hashed password is correct with bcrypt compare()
    const isMatch = await bcrypt.compare(password, user.password);

    // If there is no match bewtween passwords.
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // Create the payload for the token
    const payload = {
      id: user.id,
    };

    // Sign the token, set experation, and callback and return either error or token.
    jwt.sign(payload, jwtSec, { expiresIn: 36000 }, (err, token) => {
      if (err) throw err;
      return res.status(200).json(token);
    });
    // Return jsonwebtoken
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: { message: "500 Server Error 'api/users'" } });
  }
});

module.exports = router;

// @route GET api/auth
// @desc  Test Token
// @access Private
// router.get("/", auth, (req, res) => res.status(200).json({ test: true }));
