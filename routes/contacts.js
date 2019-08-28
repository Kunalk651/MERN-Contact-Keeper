const express = require("express");
const { check } = require("express-validator");
const Router = express.Router();

const contactController = require("../controllers/contacts");
const isAuth = require("../middleware/isAuth");

Router.get("/contacts", isAuth, contactController.getContacts);

Router.post(
  "/contacts",
  isAuth,
  [
    check("name", "Name is required.")
      .not()
      .isEmpty(),
    check("email", "Email is required.")
      .not()
      .isEmpty()
  ],
  contactController.postContact
);

Router.put("/contacts/:contactId", isAuth, contactController.updateContact);

Router.delete("/contacts/:contactId", isAuth, contactController.deleteContact);

module.exports = Router;
