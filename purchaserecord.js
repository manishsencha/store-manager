const mongoose = require("mongoose");

const purchaseRecordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date().getTime(),
  },
  data: [
    {
      item: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("PurchaseRecord", purchaseRecordSchema);
