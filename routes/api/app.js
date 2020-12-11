const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const jwt = require("jsonwebtoken");
const config = require("../../config/default.json");

const User = require("../../models/User");


router.put(
  "/",
  [
    auth,
    
  ],
  async (req, res) => {
    
    const email = req.body.email;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "User dont exists" }] });
      }
      
     
      user.email = req.body.email;
      user.fahrenheit_on = req.body.fahrenheitOn

      
      user = await User.findOneAndUpdate(
        { email: user.email },
        {
          $set: {
           
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

module.exports = router;


