const express = require("express");
const router = express.Router();
const tradesController = require("../controllers/trades");
const marketdataController = require("../controllers/marketdata");
const ensureLoggedIn = require("../config/ensureLoggedIn");
const axios = require("axios");

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
    res.render("trade", { marketData, cryptocurrencies });
  } catch (error) {
    next(error);
  }
});

//route to create a new trade
router.post("/", ensureLoggedIn, tradesController.create);

// Route to get all holdings in the portfolio
router.get("/", ensureLoggedIn, tradesController.list);

// Route to get a single holding from the portfolio
router.get("/:id", ensureLoggedIn, tradesController.show);

// Route to update a single holding in the portfolio
router.put("/:id", ensureLoggedIn, tradesController.update);

// Route to delete a single holding from the portfolio
router.delete("/:id", ensureLoggedIn, tradesController.deleteHolding);



module.exports = router;
