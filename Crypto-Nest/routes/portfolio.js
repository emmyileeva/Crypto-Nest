const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");

// Route to render portfolio.ejs
router.get("/", function (req, res) {
  res.render("portfolio");
});

module.exports = router;
