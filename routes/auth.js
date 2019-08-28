const express = require("express");
const { check } = require("express-validator");
const Router = express.Router();
const authController = require("../controllers/auth");
const isAuth = require("../middleware/isAuth");

Router.get("/auth", isAuth, authController.getAuth);

Router.post(
  "/auth",
  [
    check("email", "Please enter vailid email!").isEmail(),
    check("password", "Password is required").exists()
  ],
  authController.postAuth
);

module.exports = Router;
