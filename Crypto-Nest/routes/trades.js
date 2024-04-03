const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");
const marketdataController = require("../controllers/marketdata");
const axios = require("axios");
const tradesController = require("../controllers/trades");
const cryptocurrencyHolding = require("../models/cryptocurrencyHolding");

// Route to render trade.ejs and pass marketData and cryptocurrencies
router.get("/", ensureLoggedIn, async (req, res, next) => {
  try {
    // Call the getMarketData function from marketdataController
    const marketData = await marketdataController.getMarketData(req, res, next);
    // get all cryptocurrencies
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?ids=bitcoin,ethereum,litecoin,ripple,dogecoin&vs_currency=usd"
    );
    const userId = req.user._id;
    const cryptocurrencies = response.data;
    const holdings = await cryptocurrencyHolding.find({"user": userId });
    res.render("trade", { marketData, cryptocurrencies, holdings, userId });
  } catch (error) {
    next(error);
  }
});

// Handle the buy request
router.post('/', tradesController.create);

// Handle the sell request
router.get("/sell/:id", tradesController.update);

module.exports = router;
