const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const multer = require("../../middleware/multer");
const {
  registerValidator,
  result,
  updateUserValidator,
  updateSettingsValidator,
  forgotPasswordValidator,
  resetUpdatePasswordValidator,
} = require("../../middleware/validator");
const fs = require("fs");
require("dotenv").config();
const nodemailer = require("nodemailer");

//Register user
router.post(
  "/",
  [registerValidator, result],

  (req, res) => {
    const {
      firstname,
      password,
      email,
      favouriteCity,
      fahrenheitOn,
    } = req.body;

    User.findOne({ email }, async (err, user) => {
      if (err) {
        res.status(500).json({
          message: {
            msgBody: "Something wrong at server, please try again later.",
            msgError: true,
          },
        });
      }
      if (user) {
        res.status(400).json({
          message: {
            msgBody: "User already exists, choose another email.",
            msgError: true,
          },
        });
      } else {
        //If user has a photo attached to their email it is grabbed here. Else a default photo.
        const avatar = gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "mm",
        });
        const newUser = new User({
          firstname,
          password,
          email,
          favourite_city: favouriteCity,
          avatar,
          fahrenheit_on: fahrenheitOn,
        });
        //Encrypt the password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        newUser.save((err, doc) => {
          if (err) {
            res.status(500).json({
              message: {
                msgBody: "Something wrong at server, please try again later.",
                msgError: true,
              },
            });
          } else {
            //Creating token
            const payload = {
              user: {
                id: doc._id,
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
                      msgBody: "Account successfully created.",
                      msgError: false,
                    },
                  });
                }
              }
            );
          }
        });
      }
    });
  }
);
//Update user info
router.put("/", [auth, updateUserValidator, result], async (req, res) => {
  const avatar = gravatar.url(req.body.email, {
    s: "200",
    r: "pg",
    d: "mm",
  });
  const user = await User.findById(req.user.id, async (err, user) => {
    if (err) {
      return res.status(500).json({
        message: {
          msgBody: "Something wrong at server, please try again later.",
          msgError: true,
        },
      });
    }
    if (!user) {
      return res.status(400).json({
        message: {
          msgBody: "User dont exist, contact support.",
          msgError: true,
        },
      });
    }
  });

  if (req.body.password) {
    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);

    if (isMatch) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    } else {
      return res.status(400).json({
        message: {
          msgBody: "Old password doesnt match, please try again.",
          msgError: true,
        },
      });
    }
  }

  user.firstname = req.body.firstname;
  user.email = req.body.email;
  user.favourite_city = req.body.favouriteCity;
  user.fahrenheit_on = req.body.fahrenheitOn;
  user.avatar = avatar;
  user.save((err) => {
    console.log(err);

    if (err) {
      res.status(500).json({
        message: {
          msgBody: "Something wrong at server, please try again later.",
          msgError: true,
        },
      });
    } else {
      //Creating token
      const payload = {
        user: {
          id: req.user.id,
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
                msgBody: "Something wrong at server, please try again later.",
                msgError: true,
              },
            });
          } else {
            res.status(201).json({
              token,
              message: {
                msgBody: "Account successfully updated.",
                msgError: false,
              },
            });
          }
        }
      );
    }
  });
});

//Upload user photo
router.put("/photo", [auth, multer.single("photo")], async (req, res) => {
  const user = await User.findById(req.user.id, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: {
          msgBody: "Something wrong at server, please try again later.",
          msgError: true,
        },
      });
    }
    if (!user) {
      return res.status(400).json({
        message: {
          msgBody: "User dont exist, contact support.",
          msgError: true,
        },
      });
    }
  });
  if (!req.file || !req.file.path) {
    return res.status(400).json({
      message: {
        msgBody: "Something wrong at server, please try again later.",
        msgError: true,
      },
    });
  }
  //Reading photo and deleting photo from disk
  try {
    user.photo = fs.readFileSync(req.file.path);
    fs.unlinkSync(req.file.path);
  } catch (error) {
    return res.status(500).json({
      message: {
        msgBody: "Something wrong at server, please try again later.",
        msgError: true,
      },
    });
  }

  user.save((err) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "Something wrong at server, please try again later.",
          msgError: true,
        },
      });
    } else {
      //Creating token
      const payload = {
        user: {
          id: req.user.id,
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
                msgBody: "Something wrong at server, please try again later.",
                msgError: true,
              },
            });
          } else {
            res.status(201).json({
              token,
              message: {
                msgBody: "Account successfully updated.",
                msgError: false,
              },
            });
          }
        }
      );
    }
  });
});
//Update user settings such as celcius/fahrenheit
router.put("/settings", [auth, updateSettingsValidator], (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      $set: {
        fahrenheit_on: req.body.fahrenheitOn,
      },
    },
    { upsert: false, new: true },
    (err, user) => {
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
            msgBody: "User dont exist, contact support.",
            msgError: true,
          },
        });
      } else {
        //Creating token
        const payload = {
          user: {
            id: req.user.id,
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
                  msgBody: "Something wrong at server, please try again later.",
                  msgError: true,
                },
              });
            } else {
              res.status(201).json({
                token,
                message: {
                  msgBody: "Account successfully updated.",
                  msgError: false,
                },
              });
            }
          }
        );
      }
    }
  );
});

//Delete user
router.delete("/", auth, (req, res) => {
  User.findOneAndRemove({ _id: req.user.id }, (err, user) => {
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
          msgBody: "The user dont exists.",
          msgError: true,
        },
      });
    } else {
      console.log(user);
      res.status(200).json({
        message: {
          msgBody: "Account successfully deleted.",
          msgError: false,
        },
      });
    }
  });
});

router.post("/forgot", forgotPasswordValidator, (req, res) => {
  const email = req.body.email;

  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "Something wrong at server, please try again later.",
          msgError: true,
        },
      });
    } else if (!user) {
      res.status(403).json({
        message: {
          msgBody:
            "There is no user with this email registrated. Please try again or register a new account.",
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
                msgBody: "Something wrong at server, please try again later.",
                msgError: true,
              },
            });
          } else {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
              },
            });
            const mailOptions = {
              from: process.env.EMAIL_ADDRESS,
              to: user.email,
              subject: "Link to reset password",
              text:
                "You are recieving this because you (or someone else) have requested the reset of the password for your account. \n" +
                "Please click on the following link, or paste this into your browser to complete the process within one hour of recieving it. \n" +
                process.env.MAIL_LINK_URL +
                token +
                "\n" +
                "If you did not request this, please ignore this email and your password will remain unchanged.",
            };
            transporter.sendMail(mailOptions, (err, response) => {
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
                  message: {
                    msgBody: "Recovery mail is sent.",
                    msgError: false,
                  },
                });
              }
            });
          }
        }
      );
    }
  });
});
router.get("/reset-check-token", [auth], (req, res) => {
  User.findById(req.user.id, (err, user) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "Something wrong at server, please try again later.",
          msgError: true,
        },
      });
    }
    if (!user) {
      res.status(400).json({
        message: {
          msgBody: "No user found with this email.",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({
        message: {
          msgBody: "Password are ready to be changed",
          msgError: false,
        },
      });
    }
  });
});
router.put(
  "/reset-update-password",
  [auth, resetUpdatePasswordValidator],
  async (req, res) => {
    let hashedPassword = "";
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(req.body.password, salt);

    User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          password: hashedPassword,
        },
      },
      { upsert: false, new: true },
      (err, user) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: {
              msgBody: "Something wrong at server, please try again later.",
              msgError: true,
            },
          });
        } else if (!user) {
          res.status(400).json({
            message: {
              msgBody: "The user dont exists.",
              msgError: true,
            },
          });
        } else {
          res.status(201).json({
            message: {
              msgBody: "Password successfully updated.",
              msgError: false,
            },
          });
        }
      }
    );
  }
);
module.exports = router;
