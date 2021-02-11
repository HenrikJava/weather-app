const { check, validationResult } = require("express-validator");

const loginValidator = [
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Password is required").not().isEmpty(),
];
const registerValidator = [
  check("firstname", "Firstname is required").not().isEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  check(
    "password",
    "Password must include one lowercase character, one uppercase character, a number, a special character and must be at least 8 characters."
  )
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    .custom((value, { req, loc, path }) => {
      if (value !== req.body.confirmPassword) {
        // trow error if passwords do not match
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    }),
];
const updateUserValidator = [
  check("firstname").not().isEmpty().withMessage("Firstname is required"),
  check("email", "Please enter a valid email").isEmail(),
  check("password")
    .optional()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    .withMessage(
      "Password must include one lowercase character, one uppercase character, a number, and a special character."
    )
    .custom((value, { req, loc, path }) => {
      if (value !== req.body.confirmPassword) {
        // trow error if passwords do not match
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    }),
  check("oldPassword")
    .if(check("password").exists())
    .notEmpty()
    .withMessage("Old password required"),
];

const updateSettingsValidator = [
  check("fahrenheitOn", "Scale is required").not().isEmpty(),
  check("email", "Please enter a valid email").isEmail(),
];
const result = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: { msgBody: errors.array()[0].msg, msgError: true } });
  }
  next();
};
const forgotPasswordValidator = [
  check("email", "Please enter a valid email").isEmail(),
];

const resetUpdatePasswordValidator = [
  check(
    "password",
    "Password must include one lowercase character, one uppercase character, a number, a special character and must be at least 8 characters."
  )
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    .custom((value, { req, loc, path }) => {
      if (value !== req.body.confirmPassword) {
        // trow error if passwords do not match
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    }),
];
module.exports = {
  loginValidator,
  registerValidator,
  updateUserValidator,
  updateSettingsValidator,
  forgotPasswordValidator,
  resetUpdatePasswordValidator,
  result,
};
