// ROUTE FILE

const { Router } = require("express");
const router = Router();

// Imported Models
const User = require("../../models/User");

// Gravatar
const gravatar = require("gravatar");

// Bcryptjs
const bcrypt = require("bcryptjs");

// Express Validator
const { check, validationResult } = require("express-validator");

const userValidator = [
  check("name", "Name is required.").not().isEmpty(),
  check("email", "Email is required.").isEmail(),
  check(
    "password",
    "Passoword is should be more than 6 charachters."
  ).isLength({ min: 6 }),
];

// @route POST api/users
// @desc  Register Route
// @access Public
router.post("/", userValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password } = req.body;
    // See if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User Allready Exists" }] });
    }

    // Get users gravatar.
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    // Encrypt password with bcrypt
    user = new User({
        name, 
        email,
        avatar,
        password
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);
    
    const newUser = await User.create(user);

    return res.status(201).json(newUser)
    // Return jsonwebtoken
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: { message: "500 Server Error 'api/users'" } });
  }
});

module.exports = router;

// Misc
// @route GET api/users
// @desc  Test Route
// @access Public
// router.get("/", (req, res) => res.status(200).json({ test: true }));
