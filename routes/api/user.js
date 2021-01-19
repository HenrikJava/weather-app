const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("../../config/default.json");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const fs = require("fs");
const cloudinary = require('cloudinary')

//Register user
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

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ message: { msgBody: errors.array(), msgError: true } });
    }
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
              config.jwtSecret,
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
      return res
        .status(400)
        .json({ message: { msgBody: errors.array(), msgError: true } });
    }

    const avatar = gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    const user = await User.findById(req.user.id, async (err) => {
      if (err) {
       return res.status(500).json({
          message: {
            msgBody: "Something wrong at server, please try again later.",
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
       return res.status(500).json({
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
          config.jwtSecret,
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
  }
);
//Multer used for save photo on disk.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tempProfilePhoto");
  },
  filename: function (req, file, cb) {

    cb(null, /* uuidv4() + "-" + Date.now() + path.extname( */file.originalname)/* ) */;
  },
});
//Extra validation
const fileFilter = (req, file, cb) => {
  const validFiles = ["image/jpeg", "image/jpg", "image/png"];

  if (validFiles.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
/* const upload = multer({ storage, fileFilter });
cloudinary.config({ 
  cloud_name: 'hloyne9mx', 
  api_key: '959942379881238', 
  api_secret: 'BPt0wYd7QL_Ta8VBEuR66Pp1QZQ' 
}); */
//Upload user photo
router.put("/photo", [auth, upload.single("photo")], async (req, res) => {
  console.log(req.file.path);

  const user = await User.findById(req.user.id, async (err) => {
    if (err) {
      return res.status(500).json({
        message: {
          msgBody: "Something wrong at server, please try again later.",
          msgError: true,
        },
      });
    }
  });
  if (!req.file.path) {
    return res.status(500).json({
      message: {
        msgBody: "Something wrong at server, please try again later.",
        msgError: true,
      },
    });
  }
  //Reading photo and deleting photo from disk
  cloudinary.uploader.upload(req.file.path, (result) => {
    console.log(req.file.path);

		 console.log(result)
	})
  /* user.photo = fs.readFileSync(req.file.path);
  fs.unlinkSync(req.file.path); */
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
        config.jwtSecret,
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
router.put("/settings", [auth], async (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      $set: {
        fahrenheit_on: req.body.fahrenheitOn,
      },
    },
    { upsert: true, new: true },
    async (err) => {
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
          config.jwtSecret,
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
router.delete("/", auth, async (req, res) => {
  User.findOneAndRemove({ _id: req.user.id }, (err) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "Something wrong at server, please try again later.",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({
        message: {
          msgBody: "Account successfully deleted.",
          msgError: false,
        },
      });
    }
  });
});
//Only for development
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).populate().select(["username", "email"]);

    console.log(users);
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
