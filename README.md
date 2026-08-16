# 💰 Finance Tracker

A full-stack personal finance tracker built with **React, TypeScript, FastAPI, PostgreSQL, and SQLAlchemy**.

Finance Tracker lets you manage your income and expenses from a simple dashboard. You can create, view, edit, and delete transactions while your financial summary updates automatically.

## ✨ Features

- 📊 Financial dashboard
- 💰 Total income
- 💸 Total expenses
- 💵 Current balance
- 🔢 Total number of transactions
- ➕ Create transactions
- 👀 View transactions
- ✏️ Edit transactions
- 🗑️ Delete transactions
- 🔄 Automatic dashboard updates
- 🗄️ PostgreSQL database
- ⚡ FastAPI backend
- ⚛️ React + TypeScript frontend
- 🔗 REST API

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- CSS
- Vite

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

### Database

- PostgreSQL

## 📁 Project Structure

```text
finance-tracker/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   └── models.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SummaryCard.tsx
│   │   │   ├── TransactionForm.tsx
│   │   │   └── TransactionList.tsx
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   ├── package.json
│   └── ...
│
└── README.md
```

# 🚀 Getting Started

## Prerequisites

Before running the project, make sure you have installed:

- Python 3.10+
- Node.js
- npm
- PostgreSQL
- Git

## 1. Clone the Repository

```bash
git clone <https://github.com/ibzaa1/finance-tracker>
cd finance-tracker
```

## 2. Set Up PostgreSQL

Make sure PostgreSQL is installed and running.

Create a database for the project:

```sql
CREATE DATABASE finance_tracker;
```

Then make sure your database configuration matches the settings in:

```text
backend/app/database.py
```

> Update the database username, password, host, port, and database name to match your local PostgreSQL setup.

## 3. Set Up the Backend

Open a terminal and navigate to the backend:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python3 -m venv .venv
```

Activate the virtual environment.

### macOS / Linux

```bash
source .venv/bin/activate
```

### Windows

```bash
.venv\Scripts\activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

FastAPI also provides interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

## 4. Set Up the Frontend

Open a **new terminal**.

From the project root:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

Open the URL in your browser.

# ▶️ Running the Application

You need PostgreSQL, the backend, and the frontend running.

### Terminal 1 — PostgreSQL

Make sure PostgreSQL is running.

### Terminal 2 — Backend

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

### Terminal 3 — Frontend

```bash
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

# 🔌 API Endpoints

| Method   | Endpoint                | Description           |
| -------- | ----------------------- | --------------------- |
| `GET`    | `/`                     | Check API status      |
| `GET`    | `/transactions`         | Get all transactions  |
| `GET`    | `/transactions/{id}`    | Get a transaction     |
| `POST`   | `/transactions`         | Create a transaction  |
| `PUT`    | `/transactions/{id}`    | Update a transaction  |
| `DELETE` | `/transactions/{id}`    | Delete a transaction  |
| `GET`    | `/transactions/summary` | Get financial summary |

## Example Transaction

```json
{
  "amount": 2500,
  "description": "Monthly salary",
  "category": "Salary",
  "transaction_type": "income",
  "created_at": "2026-08-16T12:00:00"
}
```

## Example Summary Response

```json
{
  "total_income": "2500.00",
  "total_expenses": "1200.00",
  "net_balance": "1300.00",
  "total_transactions": 10
}
```

# 🧪 Development

The backend uses FastAPI's reload functionality:

```bash
uvicorn app.main:app --reload
```

The frontend uses Vite's Hot Module Replacement, so changes to React and CSS files will appear automatically during development.

```bash
npm run dev
```

# 🔐 Environment Variables

**Environment variables are hidden for privacy reasons, but use the following and enter your credential: **.

```env
DATABASE_URL=postgresql://USERNAME:PASSWORD@localhost:5432/finance_tracker
```

# 🚧 Future Improvements

The current MVP provides the core transaction management functionality.

Potential future improvements could include:

- 📈 Spending charts and analytics
- 📅 Date filtering
- 🔎 Transaction search
- 🏷️ Custom categories
- 📱 Improved mobile experience
- 🔐 User authentication
- 👤 Multiple user accounts

# 📄 License

This project is currently intended for learning and development purposes.

---

Made with ❤️ using **React, TypeScript, FastAPI, and PostgreSQL**.
