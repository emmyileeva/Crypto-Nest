const cryptocurrencyHolding = require("../models/cryptocurrencyHolding");

// add new holding to portfolio
const create = async (req, res) => {
  try {
    const newHolding = await cryptocurrencyHolding.create(req.body);
    res.status(201).json(newHolding);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all holdings in portfolio
const list = async (req, res) => {
  try {
    const holdings = await cryptocurrencyHolding.find({});
    res.status(200).json(holdings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single holding from portfolio
const show = async (req, res) => {
  try {
    const holding = await cryptocurrencyHolding.findById(req.params.id);
    res.status(200).json(holding);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a single holding in portfolio
const update = async (req, res) => {
  try {
    const updatedHolding = await cryptocurrencyHolding.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedHolding);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a single holding from portfolio
const deleteHolding = async (req, res) => {
    try {
        const deletedHolding = await cryptocurrencyHolding.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json(deletedHolding);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    create,
    list,
    show,
    update,
    deleteHolding
    };  
