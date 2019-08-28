const { validationResult } = require("express-validator");

const User = require("../models/User");
const Contact = require("../models/Contact");

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ userId: req.userId }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "internal servet error" });
  }
};

exports.postContact = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, type } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      userId: req.userId
    });
    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "internal server error." });
  }
};

exports.updateContact = async (req, res, next) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    const contact = await Contact.findById(req.params.contactId);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found." });
    }

    if (contact.userId.toString() !== req.userId) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const updateContact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      { $set: contactFields },
      { new: true }
    );
    res.json(updateContact);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "internal server error." });
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.contactId);

    if (!contact) {
      return res.status(404).json({ msg: "contact not found." });
    }

    if (contact.userId.toString() !== req.userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    await Contact.findByIdAndRemove(req.params.contactId);
    res.json({ msg: "Contact Removed." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "internal server error" });
  }
};
