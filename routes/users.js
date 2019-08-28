const express = require("express");
const { check } = require("express-validator");
const Router = express.Router();
const userController = require("../controllers/users");

Router.post(
  "/users",
  [
    check("name", "Please enter name!")
      .not()
      .isEmpty(),
    check("email", "Please enter valid email!").isEmail(),
    check("password", "Password should be atleast 6 charector!").isLength({
      min: 6
    })
  ],
  userController.postSignup
);

module.exports = Router;
