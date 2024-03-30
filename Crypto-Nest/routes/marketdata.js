const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");

// Route to render marketdata.ejs
router.get("/", function (req, res) {
  res.render("marketdata"); 
});

module.exports = router;