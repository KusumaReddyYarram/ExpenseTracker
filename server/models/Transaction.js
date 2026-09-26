const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Please specify transaction type (income or expense)']
    },
    amount: {
      type: Number,
      required: [true, 'Please add a valid amount'],
      min: [0.01, 'Amount must be greater than zero']
    },
    category: {
      type: String,
      required: [true, 'Please select or specify a category'],
      trim: true,
      index: true
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true
    },
    date: {
      type: Date,
      default: Date.now,
      index: true
    },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash', 'Other'],
      default: 'UPI'
    },
    notes: {
      type: String,
      trim: true
    },
    isRecurring: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Compound index for querying user's transactions by date & category efficiently
transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ userId: 1, category: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);
