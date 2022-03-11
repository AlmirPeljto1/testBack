//IMPORT
const jwt = require("jsonwebtoken");
//JWT TOKEN FUNCTION
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(401).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!!!");
  }
};

//EXPORTS
module.exports = verifyToken;
