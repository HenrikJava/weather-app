const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");

const jwt = require("jsonwebtoken");
const config = require("../../config/default.json");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

router.post(
  "/",
  [
    check("firstname", "Firstname is required").not().isEmpty(),
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
      password,
      email,
      favouriteCity,
      fahrenheitOn,
    } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        firstname,
        lastname,
        password,
        email,
        favourite_city: favouriteCity,
        avatar,
        fahrenheit_on: fahrenheitOn
      });
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();

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
router.put(
  "/",
  [
    auth,
    [
      check("firstname", "Firstname is required").not().isEmpty(),
      check("email", "Please enter a valid email").isEmail(),
      
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const email = req.body.email;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "User dont exists" }] });
      }
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.email = req.body.email;
      user.favourite_city = req.body.favouriteCity;
      user.fahrenheit_on = req.body.fahrenheitOn
      user.avatar = avatar

      
      user = await User.findOneAndUpdate(
        { email: user.email },
        {
          $set: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            favourite_city: user.favourite_city,
            fahrenheit_on: user.fahrenheit_on
          },
        },
        { upsert: true, new: true }
      ).exec();

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
          res.status(201).json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

  

//Only for development
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).populate().select(['username','email'])
    
    console.log(
      users
    );
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/", auth, async (req, res) => {
  try {
     await User.findOneAndRemove({_id: req.user.id})
    res.json({msg: 'User removed'});
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
