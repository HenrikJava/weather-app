const express = require("express");
const router = express.Router();
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config/default.json')
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

router.post(
  "/",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      firstname,
      lastname,
      username,
      password,
      email,
      favourite_city,
    } = req.body;

    try {
     let user = await User.findOne({email});
        if (user) {
           return  res.status(400).json({errors: [{msg: 'User already exists'}]})
        }
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        user = new User({
            firstname,lastname, username, password, email, favourite_city
        })
        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password,salt)

        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.jwtSecret, { expiresIn: 60 * 60 *24},
            (err,token) => {
                if (err) throw err
                res.json({ token })
            })
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }
  }
);

module.exports = router;
