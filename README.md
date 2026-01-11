# Swiftery - Moving & Courier Delivery Platform

## Recruiter Summary

- Purpose: Full-stack delivery platform to place and track orders.
- Role: End‑to‑end build — Frontend (HTML/CSS/JS), Backend (Node.js/Express), Database (MongoDB/Mongoose).
- Highlights: Auth, order placement, real-time tracking, service locations, responsive UI, documented architecture.
- Architecture: 3-tier (Frontend → REST API → MongoDB) with modular models (`user`, `order`, `location`).
- Quick Run:
  ```
  cd Backend && npm install && npm start
  # Frontend
  open Frontend/HomePage/index.html  # or: cd Frontend/HomePage && npm install && npm start
  ```
- Repo: https://github.com/Vbadrakia/Swiftery

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [How to Run](#how-to-run)
- [API Endpoints](#api-endpoints)
- [Frontend Pages](#frontend-pages)
- [Database Models](#database-models)
- [Project Architecture](#project-architecture)

---

## 🎯 Overview

**Swiftery** is a comprehensive delivery management system that connects customers with courier services. Users can:
- Create accounts and log in securely
- Place delivery orders with details
- Track their shipments in real-time
- View available service locations
- Manage multiple orders

The application follows a **3-tier architecture**:
1. **Frontend** - HTML/CSS/JavaScript user interface
2. **Backend** - Node.js + Express server with business logic
3. **Database** - MongoDB for persistent data storage

---

## ✨ Features

### User Management
- User registration with email and password
- Secure login authentication
- User profile management
- Last login tracking

### Order Management
- Place new delivery orders
- Specify pickup and delivery locations
- Track order status in real-time
- View order history
- Order status updates

### Location Services
- Browse available service locations
- View location details
- Filter locations by area
- Contact information for each location

### Order Tracking
- Real-time shipment tracking
- Order status visualization
- Delivery updates
- Order details and history

### Additional Features
- Responsive design for mobile and desktop
- Contact page for customer support
- Intuitive user interface
- Form validation

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Page structure and semantics
- **CSS3** - Styling and responsive design
- **Vanilla JavaScript** - Client-side interactivity
- **Bootstrap/CSS Grid** - Layout and responsive components

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework and routing
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Development Tools
- **Git** - Version control
- **npm** - Package management

---

## 📁 Project Structure

```
Website-with-backend/
│
├── Frontend/                          # User Interface (Client-side)
│   ├── HomePage/
│   │   ├── index.html                # Main landing page
│   │   ├── script.js                 # Homepage interactions
│   │   ├── style.css                 # Homepage styling
│   │   ├── server.js                 # Local dev server
│   │   └── package.json              # Frontend dependencies
│   │
│   ├── Login/
│   │   ├── index.html                # Login page
│   │   ├── script.js                 # Login form handling
│   │   ├── style.css                 # Login styling
│   │   └── images/                   # Login page images
│   │
│   ├── SignUp/
│   │   ├── index.html                # Registration page
│   │   ├── script.js                 # Sign-up form handling
│   │   └── style.css                 # SignUp styling
│   │
│   ├── PlaceOrder/
│   │   ├── place-order.html          # Order placement form
│   │   ├── place-order.js            # Order form logic
│   │   └── place-order.css           # Order styling
│   │
│   ├── TrackOrder/
│   │   ├── track-order.html          # Order tracking page
│   │   ├── track-order.js            # Tracking logic
│   │   └── track-order.css           # Tracking styling
│   │
│   ├── Location/
│   │   ├── location.html             # Service locations page
│   │   └── location.js               # Location interactions
│   │
│   ├── Contact US/
│   │   ├── index.html                # Contact page
│   │   ├── script.js                 # Contact form handling
│   │   └── style.css                 # Contact styling
│   │
│   ├── Images/                       # Image assets
│   └── node_modules/                 # Frontend dependencies
│
├── Backend/                           # Server (API & Business Logic)
│   ├── app.js                        # Main Express server
│   ├── package.json                  # Backend dependencies
│   │
│   └── src/
│       ├── config/
│       │   └── database.config.js    # MongoDB connection setup
│       │
│       └── models/
│           ├── user.model.js         # User schema & model
│           ├── order.model.js        # Order schema & model
│           └── location.model.js     # Location schema & model
│
├── .gitignore                        # Git ignore file
├── package.json                      # Root project metadata
├── PROJECT_MAP.md                    # Detailed project architecture
├── TRACK_ORDER_IMPROVEMENTS.md       # Enhancement documentation
└── README.md                         # This file
```

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (local or cloud instance) - [Setup Guide](https://www.mongodb.com/)
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Vbadrakia/Swiftery.git
cd Swiftery
```

### Step 2: Install Backend Dependencies
```bash
cd Backend
npm install
```

### Step 3: Configure Database
Create a `.env` file in the `Backend/` folder:
```
MONGODB_URI=mongodb://localhost:27017/swiftery
PORT=3000
```

### Step 4: Install Frontend Dependencies (if needed)
```bash
cd ../Frontend/HomePage
npm install
```

---

## 🚀 How to Run

### Start the Backend Server

```bash
cd Backend
npm start
```

The server will start on `http://localhost:3000`

### Run the Frontend

#### Option 1: Using Node.js Server
```bash
cd Frontend/HomePage
npm start
```

#### Option 2: Open in Browser Directly
Navigate to the `Frontend/HomePage/index.html` file in your browser, or use a local server like:
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using http-server (npm)
npx http-server
```

Then open `http://localhost:8000` in your browser.

---

## 🔌 API Endpoints

### User Management
```
POST /api/users/register
  - Create new user account
  - Body: { name, email, password }

POST /api/users/login
  - Authenticate user
  - Body: { email, password }

GET /api/users/:id
  - Get user profile
```

### Order Management
```
POST /api/orders/create
  - Create new delivery order
  - Body: { userId, pickupLocation, deliveryLocation, items, weight }

GET /api/orders/:id
  - Get order details by ID

GET /api/orders/user/:userId
  - Get all orders for a user

PUT /api/orders/:id/status
  - Update order status
  - Body: { status }
```

### Location Management
```
GET /api/locations
  - Get all service locations

GET /api/locations/:id
  - Get specific location details

POST /api/locations/search
  - Search locations by area
  - Body: { searchQuery }
```

---

## 📄 Frontend Pages

| Page | Path | Purpose |
|------|------|---------|
| **Home** | `/Frontend/HomePage/index.html` | Landing page with service overview |
| **Login** | `/Frontend/Login/index.html` | User authentication |
| **Sign Up** | `/Frontend/SignUp/index.html` | New account registration |
| **Place Order** | `/Frontend/PlaceOrder/place-order.html` | Create delivery order |
| **Track Order** | `/Frontend/TrackOrder/track-order.html` | Monitor shipment status |
| **Locations** | `/Frontend/Location/location.html` | Browse service centers |
| **Contact** | `/Frontend/Contact US/index.html` | Customer support contact |

---

## 🗄️ Database Models

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  lastLogin: Date,
  phone: String (optional),
  address: String (optional)
}
```

### Order Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  orderNumber: String (unique),
  pickupLocation: String,
  deliveryLocation: String,
  items: [String],
  weight: Number,
  status: String (pending/in-transit/delivered),
  createdAt: Date,
  updatedAt: Date,
  estimatedDelivery: Date,
  trackingNumber: String
}
```

### Location Model
```javascript
{
  _id: ObjectId,
  name: String,
  area: String,
  city: String,
  address: String,
  phone: String,
  email: String,
  operatingHours: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  }
}
```

---

## 🏗️ Project Architecture

### Three-Tier Architecture

```
┌─────────────────────────────────────┐
│   FRONTEND (Presentation Layer)     │
│   HTML/CSS/JavaScript (Client)      │
│   - User Interface                  │
│   - Form Validation                 │
│   - User Interactions               │
└──────────────┬──────────────────────┘
               │ HTTP/API Requests
               │
┌──────────────▼──────────────────────┐
│   BACKEND (Application Layer)       │
│   Node.js/Express (Server)          │
│   - Business Logic                  │
│   - Request Processing              │
│   - Authentication                  │
│   - API Routes                      │
└──────────────┬──────────────────────┘
               │ Database Queries
               │
┌──────────────▼──────────────────────┐
│   DATABASE (Data Layer)             │
│   MongoDB                           │
│   - User Data                       │
│   - Orders                          │
│   - Locations                       │
└─────────────────────────────────────┘
```

### Data Flow

1. **User submits form** on Frontend
2. **JavaScript validates** and sends API request to Backend
3. **Backend receives** request and validates data
4. **Backend queries/updates** MongoDB database
5. **Backend sends response** back to Frontend
6. **Frontend updates** UI with results

---

## 🔒 Security Considerations

- ✅ Password hashing (bcrypt recommended)
- ✅ Environment variables for sensitive data
- ✅ Input validation on both frontend and backend
- ✅ CORS configuration for API access
- ✅ SQL/NoSQL injection prevention

---

## 📝 Usage Example

### Creating an Order

1. User logs in at `/Frontend/Login/index.html`
2. Navigates to `/Frontend/PlaceOrder/place-order.html`
3. Fills out order form with pickup/delivery locations
4. Frontend sends POST request to `/api/orders/create`
5. Backend creates order in MongoDB
6. User gets confirmation with tracking number
7. User can track order at `/Frontend/TrackOrder/track-order.html`

---

## 📚 Additional Documentation

- See [PROJECT_MAP.md](PROJECT_MAP.md) for detailed architecture breakdown
- See [TRACK_ORDER_IMPROVEMENTS.md](TRACK_ORDER_IMPROVEMENTS.md) for enhancement features

---

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Guide](https://docs.mongodb.com/)
- [JavaScript MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/)
- [REST API Best Practices](https://restfulapi.net/)

---

## 👥 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support & Contact

For support, questions, or feedback, please:
- Create an issue on GitHub
- Contact through the website's contact page
- Email: support@swiftery.com

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- Built as a full-stack web development project
- Designed for delivery service management
- Incorporates best practices in web development

---

**Last Updated**: January 2026  
**Project Status**: Active Development  
**Version**: 1.0.0
