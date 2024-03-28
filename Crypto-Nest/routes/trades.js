const express = require("express");
const router = express.Router();



router.get("/trade", function (req, res) {
  res.render("trade"); // Renders the trade.ejs file
});

module.exports = router;