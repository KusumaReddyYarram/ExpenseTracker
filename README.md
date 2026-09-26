# 💎 AURA FINANCE – SMART EXPENSE TRACKER & PERSONAL FINANCE MANAGEMENT SYSTEM

> **"Don't just track your money. Understand your financial behavior."**

A modern, professional fintech-style Personal Finance Management System built using the **MERN Stack** (MongoDB Atlas, Express.js, React.js, Node.js).

---

## 🌟 Key Features

* **Intelligent Behavioral Insights**: Identifies category velocity increases, weekend spending surges, and recurring leaks.
* **Financial Health Score (82/100)**: Multi-factor evaluation of savings rate, budget discipline, and spending stability.
* **What-If Financial Simulator**: Models monthly savings boosts and expense reductions to project 1-year to 5-year compounding wealth accumulation.
* **Smart Budget Thresholds**: Tracks category limits with 80% warning and 100% exceeded alerts.
* **Unusual Spending Detection**: Flags transactions that deviate significantly from baseline purchase limits.
* **Financial Goal Pathways**: Tracks target savings milestones (e.g. MacBook Pro, Emergency Fund) with interactive progress bars.
* **Real JWT Authentication**: Secure user registration, password hashing via `bcryptjs`, and protected routes.

---

## 🛠️ Technology Stack

### **Frontend**
* React.js
* Tailwind CSS v4
* React Router v6
* Recharts
* Lucide Icons
* Axios API Layer

### **Backend**
* Node.js & Express.js
* MongoDB Atlas & Mongoose Schemas
* JWT Authentication & Middleware
* bcryptjs Password Hashing
* CORS & RESTful APIs

---

## 🚀 Quick Setup Instructions

### 1. Backend Setup
```bash
cd server
npm install
npm run dev
```
Create a `server/.env` file with:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```text
ExpenseTracker/
├── client/          # React + Tailwind frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI cards, charts, modals
│   │   ├── pages/       # Home, Login, Register, About, Dashboard
│   │   ├── layouts/     # Main, Auth, and Dashboard layouts
│   │   ├── services/    # Axios API service layer
│   │   ├── context/     # AuthContext state management
│   │   └── utils/       # Formatters & constants
│
└── server/          # Node.js + Express backend API
    ├── config/          # Database connection
    ├── controllers/     # Auth, Transaction, Budget, Goal & Insight logic
    ├── models/          # Mongoose models (User, Transaction, Budget, Goal)
    ├── routes/          # Express REST API routes
    ├── middleware/      # JWT protection & error handling
    └── services/        # Behavioral Insight Engine
```
