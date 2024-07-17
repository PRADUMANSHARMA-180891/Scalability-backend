const jwt = require("jsonwebtoken");

const VerifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json("Please login");
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json("Please login please");
  }

  try {
    const verify = await jwt.verify(token, "econstra");
    if (!verify) {
      return res.status(401).json("You are not verified");
    } else {
      req.user = verify;
      next();
    }
  } catch (err) {
    res.status(401).json(err.message);
  }
};

module.exports = VerifyToken;



// module.exports = VerifyToken;