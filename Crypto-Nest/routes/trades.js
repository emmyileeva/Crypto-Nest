const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/", function (req, res) {
  res.render("trade");
});

module.exports = router;
