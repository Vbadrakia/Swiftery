# Swiftery Project - Complete Architecture Map

## 🎯 What is Swiftery?
A **moving/courier delivery website** where users can place orders, track shipments, and manage deliveries.

---

## 📊 Project Structure Overview

```
Website-with-backend/
├── Backend/           ← Server (Node.js + Express) - Handles logic & database
├── Frontend/          ← Website (HTML/CSS/JS) - What users see
└── PROJECT_MAP.md     ← This file
```

---

## 🏗️ ARCHITECTURE LAYERS

### Layer 1: FRONTEND (What User Sees - Website Pages)
- **Location**: `Frontend/` folder
- **Technology**: HTML, CSS, JavaScript
- **Purpose**: User interface - forms, buttons, pages
- **How it works**: User clicks → JavaScript sends request to Backend → Backend processes → Result shown to user

### Layer 2: BACKEND (Server - Brain of the App)
- **Location**: `Backend/app.js`
- **Technology**: Node.js + Express.js
- **Purpose**: Process requests, manage data, talk to database
- **How it works**: Receives request from Frontend → Does calculations/checks → Saves/retrieves data from Database → Sends response back

### Layer 3: DATABASE (Data Storage)
- **Location**: MongoDB (external service)
- **Purpose**: Permanently stores all data (users, orders, locations)
- **How it works**: Backend asks database for data or saves new data

---

## 📁 DETAILED FILE MAPPING

### BACKEND FILES (Server Logic)

#### **Backend/app.js** - Main Server File
```
What it does:
  ✓ Starts the express server on port 3000
  ✓ Receives all API requests from frontend
  ✓ Connects to MongoDB database
  ✓ Handles all API routes/endpoints

Like: The "receptionist" of the whole project - receives all requests
```

**Connected to**:
- `Backend/src/config/database.config.js` (connects to MongoDB)
- `Backend/src/models/user.model.js` (handles user data)
- `Backend/src/models/order.model.js` (handles order data)
- `Backend/src/models/location.model.js` (handles location data)

---

#### **Backend/src/config/database.config.js** - Database Connection
```
What it does:
  ✓ Creates connection to MongoDB
  ✓ Tells MongoDB where to find the database

Like: A "phone line" to the database
```

**Used by**: `app.js` (needs this to talk to database)

---

#### **Backend/src/models/user.model.js** - User Data Structure
```
What it does:
  ✓ Defines what a "User" looks like
  ✓ User has: name, email, password, lastLogin date

Like: A "template" for user information
```

**API Route that uses it**:
```
POST /create-user
  → Takes name, email, password from frontend
  → Saves it in MongoDB
  
POST /login
  → Takes email, password from frontend
  → Checks if user exists with matching credentials
  → Returns user data or error
```

**Used in Frontend files**: 
- `Frontend/Login/index.html` → `script.js` sends login data

---

#### **Backend/src/models/order.model.js** - Order Data Structure
```
What it does:
  ✓ Defines what an "Order" looks like
  ✓ Order has: item, source, destination, trackingId, status, estimatedDelivery, totalBill

Like: A "form template" for order information
```

**API Routes that use it**:
```
POST /create-order
  → Takes: item, source, destination, weight
  → Generates unique trackingId (like: ORD-123456)
  → Calculates totalBill (Rs. 149 per kg)
  → Saves order in MongoDB
  
GET /track-order/:trackingId
  → Takes trackingId from frontend
  → Finds order in MongoDB
  → Generates fake "checkpoints" (delivery updates)
  → Returns order details to frontend
```

**Used in Frontend files**:
- `Frontend/PlaceOrder/place-order.html` → `place-order.js` creates order
- `Frontend/TrackOrder/track-order.html` → `track-order.js` tracks order

---

#### **Backend/src/models/location.model.js** - Location Data Structure
```
What it does:
  ✓ Defines what a "Location" looks like
  ✓ Location has: latitude, longitude

Like: A "GPS coordinate template"
```

**API Route that uses it**:
```
POST /location
  → Takes latitude, longitude from frontend
  → Saves location in MongoDB
```

**Used in Frontend files**:
- `Frontend/Location/location.html` → `location.js` sends location

---

### FRONTEND FILES (Website Pages & Logic)

#### **Frontend/HomePage/index.html** - Main Home Page
```
What it does:
  ✓ Shows the landing page
  ✓ Has navigation menu (HOME, LOGIN, PLACE ORDER, TRACK ORDER, CONTACT US)
  ✓ Shows company info, pricing table, services

Structure:
  - <nav> = Navigation menu
  - <h1> headings = Titles
  - <img> = Images
  - Tables = Pricing information
```

**Imports**:
- `/HomePage/style.css` - Styling for this page
- `/HomePage/script.js` - JavaScript logic for animations

**Navigation Links**:
```
HOME → /HomePage/index.html (self)
LOGIN → /Login/index.html
PLACE ORDER → /PlaceOrder/place-order.html
TRACK ORDER → /TrackOrder/track-order.html
CONTACT US → /Contact US/index.html
```

---

#### **Frontend/HomePage/style.css** - HomePage Styling
```
What it does:
  ✓ Defines colors, fonts, sizes for home page
  ✓ Makes navigation bar look nice
  ✓ Styles cards, buttons, tables
  ✓ Makes website responsive (works on mobile too)

Colors Used:
  - Green (#27ae60, #2ecc71) = Main brand color
  - Light green (#e8fdf5) = Background
  - White (#ffffff) = Cards, forms
```

**Used by**: `Frontend/HomePage/index.html`

---

#### **Frontend/HomePage/script.js** - HomePage Animations & Logic
```
What it does:
  ✓ Creates smooth scroll animations (using GSAP library)
  ✓ Makes elements fade in/scale up as user scrolls
  ✓ Handles form submissions (if they exist)

Animations:
  - Navigation bar changes color on scroll
  - Images fade in when scrolled into view
  - Cards scale up when hovered

Key Functions:
  - gsap.to() = Animate elements
  - addEventListener("submit") = Handle form submissions
```

**Uses Library**: GSAP (animation library - imported from CDN)

**Connected to Backend**:
```javascript
// When user places order:
fetch("http://localhost:3000/create-order", {
  method: "POST",
  body: JSON.stringify({source, destination, weight})
})
// Sends data to Backend → Backend saves to MongoDB
```

---

#### **Frontend/Login/index.html** - Login & SignUp Page
```
What it does:
  ✓ Shows login form on one side
  ✓ Shows signup form on other side
  ✓ Has flip animation between forms

Form Fields:
  Login:
    - Email
    - Password
  
  Signup:
    - Name
    - Email
    - Password
```

**Imports**:
- `/Login/style.css` - Styling for login page
- `/Login/script.js` - Form handling logic
- Font Awesome icons (from CDN)

**Form Functionality**:
```javascript
// When user clicks Login:
1. Get email and password from form
2. Send to Backend: POST /login
3. Backend checks MongoDB
4. If correct → Save user session
5. If wrong → Show error message
```

---

#### **Frontend/Login/style.css** - Login Page Styling
```
What it does:
  ✓ Styles the flip card animation
  ✓ Styles forms, inputs, buttons
  ✓ Makes login page responsive
  ✓ Defines colors and layouts
```

---

#### **Frontend/Login/script.js** - Login Logic
```
What it does:
  ✓ Handles form submission
  ✓ Sends login/signup data to backend
  ✓ Shows success or error messages
  ✓ May store user info in local storage (browser memory)

Key Functions:
  - document.getElementById("form").addEventListener("submit")
  - fetch() to send data to backend
  - localStorage.setItem() to save user info
```

**Connects to Backend**:
```
POST /login → Backend checks MongoDB
POST /create-user → Backend saves new user
```

---

#### **Frontend/PlaceOrder/place-order.html** - Place Order Page
```
What it does:
  ✓ Shows form to place a new order
  ✓ User fills: Item description, Source, Destination, Weight

Form Fields:
  - Item Description (what to ship)
  - Source Address (from where)
  - Destination Address (to where)
  - Weight in kg (how heavy)
```

**Imports**:
- `/HomePage/style.css` - Shared styling
- `/PlaceOrder/place-order.css` - Custom styling
- `/PlaceOrder/place-order.js` - Form logic

---

#### **Frontend/PlaceOrder/place-order.js** - Place Order Logic
```
What it does:
  ✓ Listens for form submission
  ✓ Gets values from form fields
  ✓ Sends to backend to create order
  ✓ Shows tracking ID to user

Process:
  1. User fills form
  2. Clicks "Place Order"
  3. JavaScript collects data
  4. POST /create-order to backend
  5. Backend generates trackingId (ORD-123456)
  6. Backend calculates cost (weight × 149)
  7. Backend saves to MongoDB
  8. Frontend shows trackingId to user
```

**Connected to Backend Route**:
```
POST /create-order
  Request: {item, source, destination, weight}
  Response: {trackingId, totalBill}
```

---

#### **Frontend/TrackOrder/track-order.html** - Track Order Page
```
What it does:
  ✓ Shows form to search orders
  ✓ User enters their Order ID (trackingId)
  ✓ Shows order status and delivery updates

Form Fields:
  - Order ID (input field)
```

**Imports**:
- `/HomePage/style.css` - Shared styling
- `/TrackOrder/track-order.css` - Custom styling
- `/TrackOrder/track-order.js` - Form logic

---

#### **Frontend/TrackOrder/track-order.js** - Track Order Logic
```
What it does:
  ✓ Listens for form submission
  ✓ Gets tracking ID from form
  ✓ Sends to backend to fetch order
  ✓ Shows order details and delivery updates

Process:
  1. User enters trackingId
  2. Clicks "Track Order"
  3. JavaScript collects trackingId
  4. GET /track-order/:trackingId to backend
  5. Backend finds order in MongoDB
  6. Backend generates fake checkpoints
  7. Frontend displays order details
```

**Connected to Backend Route**:
```
GET /track-order/:trackingId
  Request: trackingId parameter
  Response: {trackingId, item, source, destination, status, checkpoints}
```

---

#### **Frontend/Contact US/index.html** - Contact Form Page
```
What it does:
  ✓ Shows contact form
  ✓ User can submit feedback/contact info

Form Fields:
  - First Name
  - Last Name
  - Email Address
  - Courier Number
  - Message
```

**Imports**:
- `/Contact US/style.css` - Styling

---

#### **Frontend/Location/location.html** - Location Submission Page
```
What it does:
  ✓ Simple form to submit GPS coordinates
  ✓ User can enter latitude and longitude

Form Fields:
  - Latitude
  - Longitude
```

**Imports**:
- `/HomePage/style.css` - Shared styling
- `/Location/location.js` - Form logic

**Connected to Backend**:
```
POST /location
  Request: {latitude, longitude}
  Response: {location object saved to MongoDB}
```

---

## 🔄 DATA FLOW - How Everything Connects

### Example 1: User Places an Order

```
User On Website
     ↓
User fills form on PlaceOrder page
     ↓
Clicks "Place Order" button
     ↓
place-order.js gets form values
     ↓
Sends POST request to Backend: /create-order
     ↓
Backend app.js receives request
     ↓
Backend creates new order object
     ↓
Backend generates trackingId (ORD-123456)
     ↓
Backend calculates totalBill (weight × 149)
     ↓
Backend saves order to MongoDB database
     ↓
Backend sends response: {trackingId, totalBill}
     ↓
Frontend receives response
     ↓
JavaScript shows alert with trackingId
     ↓
User sees: "Your tracking ID is: ORD-123456"
```

---

### Example 2: User Tracks Their Order

```
User On Website
     ↓
User fills trackingId on TrackOrder page
     ↓
Clicks "Track Order" button
     ↓
track-order.js gets trackingId from form
     ↓
Sends GET request to Backend: /track-order/ORD-123456
     ↓
Backend app.js receives request
     ↓
Backend searches MongoDB for order with this trackingId
     ↓
Backend finds the order
     ↓
Backend generates fake delivery checkpoints:
  - "Package received at facility"
  - "Package departed from facility"
  - "Package out for delivery"
  - "Package delivered"
     ↓
Backend sends response: {order details + checkpoints}
     ↓
Frontend receives response
     ↓
JavaScript displays order info and checkpoints
     ↓
User sees delivery status and timeline
```

---

### Example 3: User Logs In

```
User on Login page
     ↓
User fills email & password
     ↓
Clicks "Login" button
     ↓
script.js collects email and password
     ↓
Sends POST request to Backend: /login
     ↓
Backend app.js receives request
     ↓
Backend searches MongoDB for user with this email
     ↓
Backend checks if password matches
     ↓
If matches → Backend sends back user data
If doesn't match → Backend sends error
     ↓
Frontend receives response
     ↓
If success → Show success message, maybe save to localStorage
If error → Show "Invalid credentials"
     ↓
User logged in or shown error
```

---

## 📊 Database Collections (MongoDB)

### Users Collection
```javascript
{
  _id: "unique_id",
  name: "John Doe",
  email: "john@example.com",
  password: "12345", // (should be hashed - not secure now)
  lastLogin: "2024-12-21T10:30:00Z"
}
```

### Orders Collection
```javascript
{
  _id: "unique_id",
  item: "Furniture",
  source: "Mumbai",
  destination: "Delhi",
  trackingId: "ORD-456789",
  status: "In Transit",
  estimatedDelivery: "2024-12-26T18:00:00Z",
  totalBill: 2090, // 5kg × 149 + taxes
  createdAt: "2024-12-21T10:00:00Z"
}
```

### Locations Collection
```javascript
{
  _id: "unique_id",
  latitude: "19.0760",
  longitude: "72.8777",
  createdAt: "2024-12-21T10:30:00Z"
}
```

---

## 🚀 How to Run The Project

### Start Backend Server:
```bash
cd Backend
npm install      # Install dependencies (express, mongoose, cors, etc)
npm start        # Start server on port 3000
# or
npm run dev      # Start with auto-reload (using nodemon)
```

### Access Frontend:
```
Open browser and go to: http://localhost:3000/
```

### What Happens:
```
1. Backend starts and connects to MongoDB
2. Backend listens for requests on port 3000
3. When you go to http://localhost:3000/
4. Backend sends Frontend/HomePage/index.html
5. HTML loads CSS and JavaScript
6. Website appears in browser
7. User can now interact (click links, fill forms, etc.)
8. Forms send data to Backend via API calls
9. Backend processes and saves to MongoDB
10. Responses sent back to show user results
```

---

## 📡 API Endpoints (Backend Routes)

```
GET /
  Returns: HomePage/index.html

POST /create-user
  Sends: {name, email, password}
  Returns: {user object}
  Saves to: Users collection

POST /login
  Sends: {email, password}
  Returns: {user object} or {error}
  Checks: Users collection

POST /location
  Sends: {latitude, longitude}
  Returns: {location object}
  Saves to: Locations collection

POST /create-order
  Sends: {item, source, destination, weight}
  Returns: {trackingId, totalBill}
  Saves to: Orders collection

GET /track-order/:trackingId
  Sends: trackingId in URL
  Returns: {order details with checkpoints}
  Searches: Orders collection
```

---

## 🔗 File Relationships Summary

```
app.js (Main Server)
  ├─→ database.config.js (MongoDB connection)
  ├─→ user.model.js (User data structure)
  ├─→ order.model.js (Order data structure)
  └─→ location.model.js (Location data structure)

index.html (Home Page)
  ├─→ style.css (Styling)
  └─→ script.js (Animations & logic)
        └─→ Calls Backend API: /create-order, /track-order

login/index.html
  ├─→ style.css (Styling)
  └─→ script.js (Form handling)
        └─→ Calls Backend API: /login, /create-user

place-order/place-order.html
  ├─→ style.css (Styling)
  └─→ place-order.js (Form handling)
        └─→ Calls Backend API: /create-order

track-order/track-order.html
  ├─→ style.css (Styling)
  └─→ track-order.js (Form handling)
        └─→ Calls Backend API: /track-order/:trackingId

location/location.html
  └─→ location.js (Form handling)
        └─→ Calls Backend API: /location
```

---

## 💡 Key Technologies Explained (Simple Terms)

| Technology | What | Why Used |
|-----------|------|----------|
| **HTML** | Structure/skeleton of pages | Defines what content goes where |
| **CSS** | Styling/colors/fonts | Makes website look pretty |
| **JavaScript** | Logic/interactivity | Makes buttons work, animations, form handling |
| **Node.js** | JavaScript runtime for backend | Runs JavaScript on server |
| **Express.js** | Framework to handle web requests | Makes creating server routes easy |
| **MongoDB** | Database (NoSQL) | Stores user, order, location data |
| **Mongoose** | Database library | Connects Node.js to MongoDB easily |
| **CORS** | Security feature | Allows frontend to talk to backend |
| **GSAP** | Animation library | Creates smooth scroll animations |

---

## ✅ Common File Operations

### When User Clicks HOME:
- Browser goes to `/`
- Backend sends `HomePage/index.html`
- Browser loads `HomePage/style.css` + `HomePage/script.js`
- Page shows with animations

### When User Clicks PLACE ORDER:
- Browser goes to `/PlaceOrder/place-order.html`
- Loads `place-order.css` + `place-order.js`
- User fills form
- `place-order.js` sends data to Backend
- Backend saves to MongoDB → Shows trackingId

### When User Clicks TRACK ORDER:
- Browser goes to `/TrackOrder/track-order.html`
- Loads `track-order.css` + `track-order.js`
- User enters trackingId
- `track-order.js` sends to Backend
- Backend retrieves from MongoDB → Shows delivery status

---

## 🎓 Think of It Like This

```
FRONTEND = The "Store Front" (what customers see)
  - Shelves (HTML) = Where products displayed
  - Lighting & Colors (CSS) = Makes store look nice
  - Sales Person (JavaScript) = Helps customers, takes orders

BACKEND = The "Warehouse" (behind the scenes)
  - Express (Routes) = Paths in the warehouse
  - Node.js (Server) = Manager running the warehouse
  - Database = Storage shelves with all products
  
USER = Customer
  - Sees store front
  - Makes request (place order)
  - Sales person (JS) passes order to warehouse manager (Backend)
  - Manager processes and stores in shelves (MongoDB)
  - Manager sends confirmation back
  - Customer sees result on store front
```

This is your **Swiftery Moving Service Website**! 🚚✅
