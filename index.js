const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isAuth = (req, res, next) => {
  let decodedToken;
  const authHeader = req.get("Authorization");
  const {
    AUTHILIZE_JWT_SECRET_KEY: secretKey,
    AUTHILIZE_STATUS_CODE: statusCode = 401,
    AUTHILIZE_ERR_MESSAGE: err = "Unauthorized Access",
  } = process.env;

  if (!secretKey) {
    return res
      .status(500)
      .json({ message: "jwt secret key for authilize is required" });
  }

  if (!authHeader) {
    return res.status(+statusCode).json({ message: err });
  }
  const token = authHeader.split(" ")[1];
  try {
    decodedToken = jwt.verify(token, secretKey);
  } catch (error) {
    return res.status(+statusCode).json({ message: err });
  }
  if (!decodedToken) {
    return res.status(+statusCode).json({ message: err });
  }

  req.decodedData = decodedToken;

  next();
};

exports.isAuthPass = (req, res, next) => {
  let decodedToken;
  const authHeader = req.get("Authorization");
  const { AUTHILIZE_JWT_SECRET_KEY: secretKey } = process.env;
  let token;

  if (authHeader) token = authHeader.split(" ")[1];

  if (token && token !== "null") {
    try {
      decodedToken = jwt.verify(token, secretKey);
    } catch (error) {
      next();
    }
  }

  if (decodedToken) req.decodedData = decodedToken;
  next();
};
