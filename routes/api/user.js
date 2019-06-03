const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

// Models
const User = require('../../models/User');


// @route   post /api/users
// @desc    Register user
// @access  Public
router.post('/', 
[
  // Second parameter is the error message
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email.').isEmail(),
  check('password', 'Plaese enter a password with 6 or more characters').isLength({ min: 6}),
],
  async (req, res) => {
    const errors = validationResult(req);

    // If an error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    } 
    
    const { name, email, password, } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ message: 'User already exists.' }] });
      }

      user = new User({ name, email, avatar, password, });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save()

      const payload = {
        user: {
          // mongoose allows .id instead of ._id
          id: user.id
        }
      };

      // Change the value of the jwtSecret in the config file in the config folder
      jwt.sign(payload, config.get('jwtsecret'), { 
        expiresIn: 360000 
      }, (err, token) => {
        if (err) throw err;
        res.send({ token });
      });
      
      // res.status(201).send({ user })
      // Return jsonwebtoken
    } catch (e) {
      res.status(500).send(e.message);
    }
});

module.exports = router;