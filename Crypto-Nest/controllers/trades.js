const CryptocurrencyHolding = require("../models/cryptocurrencyHolding");

// buy
const create = async (req, res) => {
  try {
    // Create a new cryptocurrency holding record
    const newHolding = new CryptocurrencyHolding({
      user: req.body.userId,
      cryptocurrency: req.body.cryptoType,
      amount: req.body.amount,
      purchasePrice: +req.body.price,
      purchaseDate: new Date(),
    });
    // Save the holding to the database
    await newHolding.save();
    // Redirect to the portfolio page
    res.redirect("/portfolio");
  } catch (err) {
    // Handle errors
    console.error(err);
  }
};

// sell
const update = async (req, res) => {
    try {
      // Find the holding record to update
        const holding = await CryptocurrencyHolding.findByIdAndUpdate({"user": req.params.id, "cryptocurrency": req.body.cryptoType });
        // Update the holding record
        console.log(holding);
      holding.amount -= req.body.usdAmount; 
      // Save the updated holding record
      await holding.save();
      // Redirect to the portfolio page
      res.redirect("/portfolio");
    } catch (err) {
    // Handle errors
    console.error(err);
  }
};

module.exports = {
  create,
  update,
};
