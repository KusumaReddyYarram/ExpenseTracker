const bcrypt = require('bcryptjs');

// Pre-seeded fallback data for instant demo/testing
const users = [
  {
    _id: 'user_demo_123',
    id: 'user_demo_123',
    name: 'Alex Morgan',
    email: 'demo@aura.finance',
    password: bcrypt.hashSync('password123', 10),
    currency: '₹',
    createdAt: new Date()
  }
];

const transactions = [
  {
    _id: 'tx_1',
    userId: 'user_demo_123',
    type: 'income',
    amount: 35000,
    category: 'Salary',
    description: 'Monthly Tech Salary',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    paymentMethod: 'Net Banking'
  },
  {
    _id: 'tx_2',
    userId: 'user_demo_123',
    type: 'expense',
    amount: 5200,
    category: 'Food',
    description: 'Gourmet Dinner & Groceries',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    paymentMethod: 'Credit Card'
  },
  {
    _id: 'tx_3',
    userId: 'user_demo_123',
    type: 'expense',
    amount: 2800,
    category: 'Transport',
    description: 'Fuel & Cab Rides',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    paymentMethod: 'UPI'
  },
  {
    _id: 'tx_4',
    userId: 'user_demo_123',
    type: 'expense',
    amount: 4500,
    category: 'Shopping',
    description: 'Apparel & Headphones',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    paymentMethod: 'Credit Card'
  },
  {
    _id: 'tx_5',
    userId: 'user_demo_123',
    type: 'expense',
    amount: 8950,
    category: 'Bills',
    description: 'Electricity, Wifi & Maintenance',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    paymentMethod: 'Net Banking'
  },
  {
    _id: 'tx_6',
    userId: 'user_demo_123',
    type: 'expense',
    amount: 1899,
    category: 'Entertainment',
    description: 'Netflix, Spotify & Cloud Subscriptions',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    paymentMethod: 'Credit Card'
  }
];

const budgets = [
  { _id: 'b_1', userId: 'user_demo_123', category: 'Food', amount: 6000, month: new Date().getMonth() + 1, year: new Date().getFullYear() },
  { _id: 'b_2', userId: 'user_demo_123', category: 'Shopping', amount: 5000, month: new Date().getMonth() + 1, year: new Date().getFullYear() },
  { _id: 'b_3', userId: 'user_demo_123', category: 'Transport', amount: 3500, month: new Date().getMonth() + 1, year: new Date().getFullYear() }
];

const goals = [
  { _id: 'g_1', userId: 'user_demo_123', title: 'New M3 MacBook Pro', targetAmount: 120000, savedAmount: 78000, category: 'Tech' },
  { _id: 'g_2', userId: 'user_demo_123', title: 'Emergency Fund (6 Months)', targetAmount: 200000, savedAmount: 145000, category: 'Savings' }
];

const subscriptions = [
  { _id: 's_1', userId: 'user_demo_123', name: 'Netflix 4K', amount: 649, billingCycle: 'monthly', category: 'Entertainment' },
  { _id: 's_2', userId: 'user_demo_123', name: 'Spotify Premium', amount: 119, billingCycle: 'monthly', category: 'Entertainment' },
  { _id: 's_3', userId: 'user_demo_123', name: 'iCloud 2TB', amount: 749, billingCycle: 'monthly', category: 'Cloud Storage' },
  { _id: 's_4', userId: 'user_demo_123', name: 'Cult.fit Gym Pass', amount: 1250, billingCycle: 'monthly', category: 'Health' }
];

module.exports = {
  users,
  transactions,
  budgets,
  goals,
  subscriptions
};
