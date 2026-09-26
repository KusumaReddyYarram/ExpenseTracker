const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    targetAmount: {
      type: Number,
      required: true,
      min: 1
    },
    savedAmount: {
      type: Number,
      default: 0
    },
    targetDate: {
      type: Date
    },
    category: {
      type: String,
      default: 'General Savings'
    },
    status: {
      type: String,
      enum: ['in-progress', 'completed'],
      default: 'in-progress'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Goal', goalSchema);
