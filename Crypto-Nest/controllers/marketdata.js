const axios = require("axios");

// Function to get market data from the API
const getMarketData = async () => {
  try {
    const apiUrl = "https://api.coingecko.com/api/v3/coins/markets";
    const params = {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 10,
      page: 1,
      sparkline: false,
      price_change_percentage: "1h,24h,7d",
      locale: "en",
      precision: "2",
    };
    const response = await axios.get(apiUrl, {
      headers: {
        "x-cg-demo-api-key": "CG-RwgLCSWJH4cMYrex7AsjxVo7",
      },
      params: params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to handle the search request
const searchCoin = async (req, res, next) => {
  try {
    // Get the coin ID from the request body
    const coinId = req.body.coinId;
    console.log(coinId);
    // Define the URLs for the API requests
    const marketDataUrl = "https://api.coingecko.com/api/v3/coins/markets";
    const params = {
      vs_currency: "usd",
      ids: coinId,
      order: "market_cap_desc",
      per_page: 10,
      page: 1,
      sparkline: false,
      price_change_percentage: "1h,24h,7d",
      locale: "en",
      precision: "2",
    };
    const marketDataResponse = await axios.get(marketDataUrl, {
      headers: {
        "x-cg-demo-api-key": "CG-RwgLCSWJH4cMYrex7AsjxVo7",
      },
      params: params,
    });
    const coinDataUrl = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    const coinDataResponse = await axios.get(coinDataUrl);

    // Extract data from responses
    const marketData = marketDataResponse.data;
    const coinData = coinDataResponse.data;
    // Render the view with both sets of data
    res.render("marketdata", { coinData, marketData });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMarketData,
  searchCoin,
};
