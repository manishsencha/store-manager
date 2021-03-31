const mongoose = require("mongoose");

const storeDataSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("storeData", storeDataSchema);
