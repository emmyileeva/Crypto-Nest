const CryptocurrencyHolding = require("../models/CryptocurrencyHoldings");

// buy
const create = async (req, res) => {
  try {
    const { cryptoType, amount, userId, price } = req.body;
    // Create a new holding entry
    const newHolding = new CryptocurrencyHolding({
      user: userId,
      cryptocurrency: cryptoType,
      amount: +amount,
      purchasePrice: +price,
      purchaseDate: new Date(),
    });
    // Save the new holding to the database
    await newHolding.save();
      res.redirect("/trades");
  } catch (err) {
    // Handle errors
    console.error(err);
  }
};

// sell
const update = async (req, res) => {
  try {
    const { userId, cryptoType, usdAmount } = req.body;
    // Create a new holding entry for the sell transaction
    const newHolding = new CryptocurrencyHolding({
      user: userId,
      cryptocurrency: cryptoType,
      amount: -usdAmount, // Set amount as negative for sell
      sellDate: new Date(), // Set sell date
    });
    // Save the new holding record
    await newHolding.save();
       res.redirect("/trades");
  } catch (err) {
    // Handle errors
    console.error(err);
  }
};

module.exports = {
  create,
  update,
};
