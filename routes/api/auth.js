const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require('bcryptjs')

const config = require('../../config/default.json')
const jwt = require('jsonwebtoken')

const { check, validationResult } = require("express-validator");
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
"/",
  [check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Password is required"
    ).exists()
  ],
  async (req, res) => {
    console.log(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      
      password,
      email,
     
    } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      
     const isMatch = await bcrypt.compare(password, user.password)
      
if (!isMatch) {
    return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
}

      const payload = {
        user: {
          id: user.id,
        },
      };
      //TODO change expires
      jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: 60 * 60 * 24 * 100 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);
module.exports = router;