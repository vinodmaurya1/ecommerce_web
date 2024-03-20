const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication failed Token missing." });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Authentication failed Invalid token." });
      }
    })
    next();
  } catch (err) {
    if (err.message == "jwt expired")
      return res
        .status(401)
        .send({ status: false, message: "JWT expired, login again" });
    if (err.message == "invalid signature")
      return res
        .status(401)
        .send({
          status: false,
          message: "Token is incorrect authentication failed",
        });
    res.status(500).send({ status: false, error: err.message });
  }
};


module.exports = {authorization };
