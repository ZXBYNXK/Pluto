// ROUTE FILE
const { Router } = require("express");
const router = Router();

// Models
const User = require("../../models/User");

// Middleware
const auth = require("../../middleware/auth");

// @route GET api/auth
// @desc  Get user data by token
// @access Private
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "Server Error"});
    }

});



module.exports = router;


// @route GET api/auth
// @desc  Test Token
// @access Private
// router.get("/", auth, (req, res) => res.status(200).json({ test: true }));