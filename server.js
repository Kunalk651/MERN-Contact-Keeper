const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const app = express();

// Middleware
app.use(express.json({ extended: false }));

// Routs
app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/contacts"));

// server static assests in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("views/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "views", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5555;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`server started at port: ${PORT}`));
});
