const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");
const marketdataController = require("../controllers/marketdata");


// Route to render marketdata.ejs and pass marketData
router.get("/", ensureLoggedIn, async (req, res, next) => {
  try {
    // Call the getMarketData function from marketdataController
    const marketData = await marketdataController.getMarketData(req, res, next);
    res.render("marketdata", { marketData });
  } catch (error) {
    next(error);
  }
});

// Handle the search request
router.post("/search", async (req, res, next) => {
    try {
        const searchQuery = req.body.query;
        const marketData = await marketdataController.getMarketData(req, res, next, searchQuery);
        res.render("marketdata", { marketData });
    } catch (error) {
        next(error);
    }
});
module.exports = router;
