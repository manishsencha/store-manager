const mongoose = require("mongoose");

const cartDataSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model("cartData", cartDataSchema);
