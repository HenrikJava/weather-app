const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");
//Load user
router.get("/", auth, (req, res) => {
  User.findById(req.user.id, (err, user) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "Something wrong at server, please try again later.",
          msgError: true,
        },
      });
    }
    else if (!user) {
      res.status(400).json({
               message: {
          msgBody: "User dont exists anymore.",
          msgError: true,
        },
      });
    }
    else {
      res.status(200).json({
        user,
        message: {
          msgBody: "User found.",
          msgError: false,
        },
      });
    }
  });
});
//Login user
router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password","Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: { msgBody: errors.array()[0].msg, msgError: true } });
    } else {
      const { password, email } = req.body;

      User.findOne({ email }, async (err, user) => {
        if (err) {
          res.status(500).json({
            message: {
              msgBody: "Something wrong at server, please try again later.",
              msgError: true,
            },
          });
        } else if (!user) {
          res.status(400).json({
            message: {
              msgBody: "The password or email is not valid",
              msgError: true,
            },
          });
        } else {
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            res.status(400).json({
              message: {
                msgBody: "The password or email is not valid",
                msgError: true,
              },
            });
          } else {
            //Creating token
            const payload = {
              user: {
                id: user.id,
              },
            };
            //TODO change expires
            
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              { expiresIn: 60 * 60 * 24 * 100 },
              (err, token) => {
                if (err) {
                  res.status(500).json({
                    message: {
                      msgBody:
                        "Something wrong at server, please try again later.",
                      msgError: true,
                    },
                  });
                } else {
                  res.status(200).json({
                    token,
                    message: {
                      msgBody: "Successfully logged in.",
                      msgError: false,
                    },
                  });
                }
              }
            );
          }
        }
      });
    }
  }
);
module.exports = router;
