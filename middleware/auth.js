const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({
        message: { msgBody: "No token, authorization denied", msgError: true },
      });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: { msgBody: "Token is not valid", msgError: true } });
  }
};
