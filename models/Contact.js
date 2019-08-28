const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    phone: {
      type: String
    },
    type: {
      type: String,
      default: "personal"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);
