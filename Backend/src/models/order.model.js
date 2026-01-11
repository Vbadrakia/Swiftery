const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  item: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  trackingId: { type: String, unique: true, required: true },
  status: { type: String, default: "In Transit" },
  estimatedDelivery: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  totalBill: { type: Number, required: true }, // Add total bill field
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
