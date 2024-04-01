const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");

// Route to render settings.ejs
router.get("/", function (req, res) {
  res.render("settings");
});

module.exports = router;
