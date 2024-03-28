const express = require("express");
const router = express.Router();
// Route to render trade.ejs
router.get("/", function (req, res) {
  res.render("trade"); 
});

module.exports = router;