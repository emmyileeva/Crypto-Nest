const axios = require("axios");

// Function to get market data from the API
const getMarketData = async (req, res, next) => {
    try {
        // Make a GET request to the API
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            headers: {
                'x-cg-demo-api-key': 'CG-RwgLCSWJH4cMYrex7AsjxVo7'
            }
        });
        // extract the data from the response
        const marketData = response.data;
        // send response to the client
        res.json(marketData);
    } catch (error) {
        // Pass any errors to the error handler
        next(error);
    }
};

module.exports = {
    getMarketData,
};