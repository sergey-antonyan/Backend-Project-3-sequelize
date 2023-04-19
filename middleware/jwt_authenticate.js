const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;


exports.authenticateTokenAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, SECRET, (err, data) => {
    console.log(data, 123);
    if (err) {
      return res.sendStatus(403);
    } else if (data.role == 0) {
      return res.sendStatus(403);
    }
    //admin
    if (data.role == 1) {
      next();
    }
  });
}

exports.authenticateTokenUser = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, SECRET, (err, data) => {
    if (err) {
      return res.sendStatus(403);
    } else if (data.role == 0) {
      next()
    }
 
  });
}

