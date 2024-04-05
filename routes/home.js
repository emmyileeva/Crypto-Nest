const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");
const CryptocurrencyHolding = require("../models/CryptocurrencyHoldings");

// Route handler for the home page
router.get("/", ensureLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user._id;
    // Get all holdings for the user
    const holdings = await CryptocurrencyHolding.find({ user: userId });
    const reducedHoldings = holdings.reduce((accumulator, currentHolding) => {
      // Find the index of the holding in the accumulator
      const index = accumulator.findIndex(
        (holding) => holding.cryptocurrency === currentHolding.cryptocurrency
      );
      if (index !== -1) {
        // If the holding is already in the accumulator, add the current amount to the existing amount
        accumulator[index].amount += currentHolding.amount;
      } else {
        // If the holding is not in the accumulator, add it
        accumulator.push(currentHolding);
      }
      return accumulator;
    }, []);
    // Render the portfolio.ejs template with the holdings data
    res.render("home", { holdings: reducedHoldings });
  } catch (err) {
    // Handle errors
    console.error(err);
    next(err);
  }
});

module.exports = router;
