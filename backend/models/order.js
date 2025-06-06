
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],
  status: { 
    type: String, 
    default: "Order Placed",
    enum: ["Order Placed", "Pending", "Out for delivery", "Delivered", "Canceled"],
  },
},
{ timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
