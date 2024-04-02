const express = require("express");
const router = express.Router();
const tradesController = require("../controllers/trades");
const ensureLoggedIn = require("../config/ensureLoggedIn");
const axios = require("axios");


// Route to get all cryptocurrencies
router.get("/", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?ids=bitcoin,ethereum,litecoin,ripple,dogecoin&vs_currency=usd"
    );
    const cryptocurrencies = response.data;
    res.render("trade", { cryptocurrencies });
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
