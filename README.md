#  FoodieHub — Online Food Delivery App

A full-stack online food ordering platform built with **React (Vite)** on the frontend and **FastAPI (Python)** on the backend. It features a beautiful UI, secure authentication, cart management, order placement, and a full-featured Admin Dashboard.

---

##  Live Features

-  **Home Page** — Browse restaurants with search and category filters
-  **Restaurant Menu** — View food items with add-to-cart functionality (with live quantity controls)
-  **Cart** — Manage items, quantities and view bill breakdown in ₹
-  **Checkout** — Pay via Card, UPI, or Cash on Delivery
-  **Orders** — Track all your past orders and their status
-  **Auth** — Register & Login with JWT-based authentication
-  **Admin Dashboard** — Full management for Orders, Restaurants, Menu Items, and Customers

---

##  Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, Vite, React Router, Axios |
| Styling    | Vanilla CSS (custom design system)  |
| Backend    | FastAPI (Python)                    |
| Database   | SQLite with SQLAlchemy ORM          |
| Auth       | JWT (JSON Web Tokens) + bcrypt      |

---

##  Project Structure

```
Online Food Order/
├── backend/
│   ├── app/
│   │   ├── main.py            # FastAPI app entry point
│   │   ├── models.py          # SQLAlchemy models
│   │   ├── schemas.py         # Pydantic schemas
│   │   ├── auth.py            # Auth utilities (JWT, hashing)
│   │   ├── database.py        # DB session setup
│   │   └── routers/
│   │       ├── auth.py        # Login/Register routes
│   │       ├── restaurants.py # Restaurant & menu routes
│   │       ├── cart.py        # Cart routes
│   │       ├── orders.py      # Order routes
│   │       └── admin.py       # Admin-only routes
│   ├── seed.py                # DB seed script
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── pages/             # Home, Restaurant, Cart, Payment, Orders, Admin
    │   ├── components/        # Navbar, Cards, Buttons, Loader, etc.
    │   ├── context/           # AuthContext, CartContext
    │   └── services/          # API service (Axios)
    ├── index.html
    └── package.json
```

---

## ⚙️ Setup & Installation

### Prerequisites
- **Python 3.10+**
- **Node.js 18+**
- **npm**

---

### 1. Clone the Repository

```bash
git clone https://github.com/abhinavdsn0905/Online-Food-Delivery-App.git
cd Online-Food-Delivery-App
```

---

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Seed the database with sample data
python seed.py

# Start the backend server
uvicorn app.main:app --reload
```

The backend will run at: **http://localhost:8000**

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The frontend will run at: **http://localhost:5173**

---

##  Demo Credentials

| Role  | Email                    | Password     |
|-------|--------------------------|--------------|
| Admin | admin@foodiehub.com      | admin123     |
| User  | testuser@gmail.com       | password123  |

---

## 🍽️ Restaurants & Menu

The app comes pre-loaded with popular global chains and authentic Indian restaurants:

| Restaurant       | Cuisine                       |
|------------------|-------------------------------|
|  KFC            | Fast Food, American           |
|  Domino's Pizza | Pizzas, Italian               |
|  McDonald's     | Burgers, Fast Food            |
|  Paradise Biryani | Biryani, North Indian       |
|  Haldiram's     | North Indian, Snacks, Sweets  |
|  Saravana Bhavan | South Indian, Vegetarian     |

---

## 🛠️ Admin Dashboard

Accessible at `/admin` after logging in with admin credentials.

-  **Dashboard** — Revenue, order stats & recent transactions
-  **Orders** — View all orders, mark as Delivered or Cancelled
-  **Restaurants** — Add, edit restaurants and manage their menu items (with image upload support)
-  **Customers** — View and remove user accounts

---



## 🙋‍♂️ Author

**Abhinav DSN**  
[GitHub](https://github.com/abhinavdsn0905)





