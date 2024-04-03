const CryptocurrencyHolding = require("../models/cryptocurrencyHolding");

// function to calculate total amount bought for a specific coin
const calculateTotalAmount = async (userId, cryptoType) => {
  try {
    // Find all buy transactions for the specified cryptocurrency and user
    const buyTransactions = await CryptocurrencyHolding.find({
      user: userId,
      cryptocurrency: cryptoType,
      amount: { $gt: 0 }, // Only positive amounts (buys)
    });
    // Calculate the total amount bought
    const totalAmount = buyTransactions.reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);
    return totalAmount;
  } catch (err) {
    // Handle errors
    console.error(err);
  }
};

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
    // calculate total amount bought for a specific coin
    const totalAmount = await calculateTotalAmount(
      req.body.userId,
      req.body.cryptoType
    );
    // Redirect to the portfolio page with the total amount
    res.redirect(`/portfolio/${req.body.userId}?totalAmount=${totalAmount}`);
  } catch (err) {
    // Handle errors
    console.error(err);
  }
};

// sell
const update = async (req, res) => {
  try {
    // Create a new holding record for the sell transaction
    const newHolding = new CryptocurrencyHolding({
      user: req.params.id,
      cryptocurrency: req.body.cryptoType,
      amount: -req.body.usdAmount, // Set amount as negative for sell
      sellDate: new Date(), // Set sell date
    });
    // Save the updated holding record
    await newHolding.save();
    // calculate total amount bought for a specific coin
    const totalAmount = await calculateTotalAmount(
      req.body.userId,
      req.body.cryptoType
    );
    // Redirect to the portfolio page with the total amount
    res.redirect(`/portfolio/${req.body.userId}?totalAmount=${totalAmount}`);
  } catch (err) {
    // Handle errors
    console.error(err);
  }
};

module.exports = {
  calculateTotalAmount,
  create,
  update,
};
