const axios = require("axios");

// Function to get market data from the API
const getMarketData = async (req, res, next) => {
  try {
    //query parameters
    const params = {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 5,
      page: 1,
      sparkline: false,
      price_change_percentage: "1h,24h,7d",
      locale: "en",
      precision: "2",
    };
    // Make a GET request to the API
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        headers: {
          "x-cg-demo-api-key": "CG-RwgLCSWJH4cMYrex7AsjxVo7",
        },
        params: params, // pass the params object to the API
      }
    );
    // extract the data from the response
    const marketData = response.data;
    // send response to the client
    return marketData;
  } catch (error) {
    // Pass any errors to the error handler
    next(error);
  }
};

module.exports = {
  getMarketData,
};
