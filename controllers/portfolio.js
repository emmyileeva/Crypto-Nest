const CryptocurrencyHolding = require("../models/cryptocurrencyHolding");

const calculateTotalAmount = async (userId, cryptoType) => {
  try {
    // Find all buy transactions for the specified cryptocurrency and user
    const buyTransactions = await CryptocurrencyHolding.find({
      user: userId,
      cryptocurrency: cryptoType,
      amount: { $gt: 0 }, // Only positive amounts (buys)
    });

    // Calculate the total amount bought
    const totalAmountBought = buyTransactions.reduce((total, transaction) => {
      return total + transaction.amount; // Summing up all buy amounts
    }, 0);

    // Find all sell transactions for the specified cryptocurrency and user
    const sellTransactions = await CryptocurrencyHolding.find({
      user: userId,
      cryptocurrency: cryptoType,
      amount: { $lt: 0 }, // Only negative amounts (sells)
    });

    // Calculate the total amount sold
    const totalAmountSold = sellTransactions.reduce((total, transaction) => {
      return total + transaction.amount; // Summing up all sell amounts
    }, 0);

    // Calculate the net amount by subtracting the total amount sold from the total amount bought
    const netAmount = totalAmountBought - totalAmountSold;

    return netAmount;
  } catch (err) {
    // Handle errors
    console.error(err);
  }
};

// Function to update holdings based on transactions
const updateHoldings = async (userId, cryptoType, amount) => {
  try {
    // Check if the user already has holdings for the specified cryptocurrency
    const existingHolding = await CryptocurrencyHolding.findOne({
      user: userId,
      cryptocurrency: cryptoType,
    });
    if (existingHolding) {
      // If there is an existing holding, update the amount
      existingHolding.amount += amount;
      await existingHolding.save();
    } else {
      // If there is no existing holding, create a new holding entry
      const newHolding = new CryptocurrencyHolding({
        user: userId,
        cryptocurrency: cryptoType,
        amount: +amount,
        purchasePrice: null, // default value
        purchaseDate: new Date(), // Set the purchase date
      });
      // Save the new holding to the database
      await newHolding.save();
    }
  } catch (err) {
    // Handle errors
    console.error(err);
  }
};

module.exports = {
  calculateTotalAmount,
  updateHoldings,
};
