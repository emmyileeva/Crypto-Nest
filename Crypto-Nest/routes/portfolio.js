const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");
const cryptocurrencyHolding = require("../models/cryptocurrencyHolding");
const calculateTotalAmount =
  require("../controllers/trades").calculateTotalAmount;

// Route handler for the portfolio page
router.get("/", ensureLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user._id;
    // Get all holdings for the user
    const holdings = await cryptocurrencyHolding.find({ user: userId });
    // Calculate total amount for each cryptocurrency
    const holdingsWithTotalAmount = await Promise.all(
      holdings.map(async (holding) => {
        const totalAmount = await calculateTotalAmount(
          userId,
          holding.cryptocurrency
        );
        return { ...holding.toObject(), totalAmount };
      })
    );
    // Render the portfolio.ejs template with the holdings data
    res.render("portfolio", { holdings: holdingsWithTotalAmount });
  } catch (err) {
    // Handle errors
    console.error(err);
    next(err);
  }
});

module.exports = router;
