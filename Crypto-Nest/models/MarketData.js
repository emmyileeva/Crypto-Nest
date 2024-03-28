const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marketDataSchema = new Schema({
    cryptocurrency: String,
    price: Number,
    marketCap: Number,
    volume: Number,
    lastUpdated: Date,
});

module.exports = mongoose.model("MarketData", marketDataSchema);