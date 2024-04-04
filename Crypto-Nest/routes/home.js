const express = require("express");
const router = express.Router();
const CryptocurrencyHolding = require("../models/cryptocurrencyHolding");
const ensureLoggedIn = require("../config/ensureLoggedIn");

// Define a route handler to render the home page
router.get("/", ensureLoggedIn, async (req, res) => {
    console.log("going home");
  try {
      // Retrieve the user ID
      console.log("req.user", req.user);
      const userId = req.user.id;
      console.log("userId", userId);
    // Fetch the holdings data for the user
      const holdings = await CryptocurrencyHolding.find({ user: userId });
      console.log("holdings", holdings);
    // Calculate total balance
    let totalBalance = 0;
    holdings.forEach((holding) => {
      totalBalance += holding.amount;
    });
    console.log("totalBalance", totalBalance);
    // Render the home.ejs template and pass the user data and holdings data
    res.render("home", {
      user: req.user,
      holdings: holdings,
      totalBalance: totalBalance,
    });
  } catch (err) {
    // Handle errors
      console.error(err);
  }
});

module.exports = router;
