const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token found, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "supersecretkey");

    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ msg: "token not valid" });
  }
};
