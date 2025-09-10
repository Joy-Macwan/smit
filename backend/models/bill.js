const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  customer: {
    name: String,
    phone: String,
    email: String,
  },
  billingDate: String,
  items: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
      tax: Number,
      discount: Number,
      total: String,
    },
  ],
  subtotal: Number,
  totalTax: Number,
  totalDiscount: Number,
  grandTotal: String,
  profit: String,
});

module.exports = mongoose.model('Bill', billSchema);
