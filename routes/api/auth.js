const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();

// Middleware
const auth = require('../../middleware/auth');

// @route   GET /api/auth
// @desc    Get basic user info
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).send({ userObj })
  } catch (e) {
    res.status(500).send({ message: "Server error" });
  }
});

// @route   post /api/auth
// @desc    Authenticate (Login) User & get token
// @access  Public
router.post('/', 
[
  // Second parameter is the error message
  check('email', 'Please include a valid email.').isEmail(),
  check('password', 'Plaese is required').exists(),
],
  async (req, res) => {
    const errors = validationResult(req);

    // If an error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    } 
    
    const { email, password, } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ errors: [{ message: 'Invalid credentials.' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(400).json({ errors: [{ message: 'Invalid credentials' }] });
      };

      const payload = {
        user: {
          // mongoose allows .id instead of ._id
          id: user.id
        }
      };

      // Change the value of the jwtSecret in the config file in the config folder
      jwt.sign(payload, config.get('jwtSecret'), {
        // Change this value at your will
        // By default, it is set to 360000, or 5 days
        expiresIn: 360000 
      }, (err, token) => {
        if (err) throw err;

        return res.status(200).send({ user, token })
      });
    } catch (e) {
      res.status(500).send(e.message);
    }
});

module.exports = router;