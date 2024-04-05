const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cryptocurrencyHoldingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    cryptocurrency: String,
    amount: Number,
    purchasePrice: Number,
    purchaseDate: Date,
    sellDate: Date,
});

module.exports = mongoose.model('CryptocurrencyHolding', cryptocurrencyHoldingSchema);