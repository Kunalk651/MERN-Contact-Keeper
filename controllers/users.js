const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validationResult } = require("express-validator");

exports.postSignup = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exist" });
    }

    const users = new User({ name, email, password });
    const salt = await bcrypt.genSalt(12);
    users.password = await bcrypt.hash(password, salt);
    await users.save();

    jwt.sign({ id: users.id }, "supersecretkey", (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error!" });
  }
};
