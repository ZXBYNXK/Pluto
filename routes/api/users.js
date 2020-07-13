// ROUTE FILE
const { Router } = require("express");
const router = Router();

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

// @route GET api/users
// @desc  Test Route
// @access Public
// router.get("/", (req, res) => res.status(200).json({ test: true }));

// @route POST api/users
// @desc  Test Route
// @access Public
router.post("/", userValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: { message: "500 Server Error 'api/users'" } });
  }
});

module.exports = router;
