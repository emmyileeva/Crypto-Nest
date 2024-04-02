const express = require("express");
const router = express.Router();
const tradesController = require("../controllers/trades");
const marketdataController = require("../controllers/marketdata");
const ensureLoggedIn = require("../config/ensureLoggedIn");
const axios = require("axios");
const cryptocurrencyHolding = require("../models/cryptocurrencyHolding");

//route to create a new trade(buying)
router.post("/buy", ensureLoggedIn, tradesController.create);

//route to create a new trade(selling)
router.post("/sell", ensureLoggedIn, tradesController.create);

// Route to get a single holding
router.get("/:id", ensureLoggedIn, tradesController.show);

// Route to render holding update form
router.get("/:id/edit", ensureLoggedIn, tradesController.edit);

// Route to update a single holding
router.put("/:id", ensureLoggedIn, tradesController.update);

// Route to delete a single holding
router.delete("/:id", ensureLoggedIn, tradesController.deleteHolding);

// Route to render trade.ejs and pass marketData and cryptocurrencies
router.get("/", ensureLoggedIn, async (req, res, next) => {
  try {
    // Call the getMarketData function from marketdataController
    const marketData = await marketdataController.getMarketData(req, res, next);
    // get all cryptocurrencies
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?ids=bitcoin,ethereum,litecoin,ripple,dogecoin&vs_currency=usd"
    );
    const cryptocurrencies = response.data;
      const holdings = await cryptocurrencyHolding.find({});
    res.render("trade", { marketData, cryptocurrencies, holdings });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
