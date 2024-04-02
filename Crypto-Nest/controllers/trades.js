const cryptocurrencyHolding = require("../models/cryptocurrencyHolding");

// add new holding
const create = async (req, res) => {
  try {
    const newHolding = await cryptocurrencyHolding.create(req.body);
    res.send(newHolding);
  } catch (err) {
    console.error(err);
  }
};

// get all holdings
const list = async (req, res) => {
  try {
    const holdings = await cryptocurrencyHolding.find({});
    res.render("trade", { holdings });
  } catch (err) {
    console.error(err);
  }
};

// get a single holding
const show = async (req, res) => {
  try {
    const holding = await cryptocurrencyHolding.findById(req.params.id);
    res.render("trade", { holding });
  } catch (err) {
    console.error(err);
  }
};

// update a single holding
const update = async (req, res) => {
  try {
    const updatedHolding = await cryptocurrencyHolding.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(updatedHolding);
  } catch (err) {
    console.error(err);
  }
};

// edit a single holding
const edit = async (req, res) => {
  try {
    const holding = await cryptocurrencyHolding.findById(req.params.id);
    res.render("trade", { holding });
  } catch (err) {
    console.error(err);
  }
};

// delete a single holding
const deleteHolding = async (req, res) => {
  try {
    const deletedHolding = await cryptocurrencyHolding.findByIdAndDelete(
      req.params.id
    );
    res.send(deletedHolding);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  create,
  list,
  show,
  update,
  edit,
  deleteHolding,
};
