const express = require("express");
// load environment variables from .env (if present)
require('dotenv').config();
const connectToDataBase = require("./src/config/database.config");
const userModel = require("./src/models/user.model");
const locationModel = require("./src/models/location.model");
const orderModel = require("./src/models/order.model"); // Import the order model
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // For generating unique tracking IDs
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Connect to DB, and only start the server after successful connection

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8080",
      "https://swiftery.pages.dev",
      process.env.FRONTEND_URL || "*"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Note: use the central connectToDataBase helper (which will throw on failure) 

// Serve static files from the Frontend folder
app.use(express.static(path.join(__dirname, "../Frontend")));

// Default route to serve index.html from the HomePage folder
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/HomePage/index.html"));
});

app.post("/create-user", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.create({
      name,
      email,
      password,
    });
    console.log(user);
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "invalid email or password" });
      return;
    }
    if (user.password !== password) {
      res.status(400).json({ message: "invalid email or password" });
      return;
    }

    res.status(200).json({ user });
  } catch (e) {
    console.log(e);
  }
});

app.post("/location", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const location = await locationModel.create({
      latitude,
      longitude,
    });
    console.log(location);
    res.status(201).json({ location });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add this new route to fetch location by IP address
app.get("/location-by-ip", async (req, res) => {
  try {
    const ip = req.ip;
    const response = await axios.get(
      `https://ipinfo.io/${ip}/json?token=YOUR_TOKEN_HERE`
    );
    const { loc } = response.data;
    const [latitude, longitude] = loc.split(",");
    res.status(200).json({ latitude, longitude });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your API key

// Route to create an order
app.post("/create-order", async (req, res) => {
  try {
    const { item, source, destination, weight } = req.body;
    const trackingId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`; // Generate random Order ID

    // Calculate cost (example: Rs. 50 per kg)
    const costPerKg = 149;
    const totalBill = weight * costPerKg;

    const order = new orderModel({
      item,
      source,
      destination,
      trackingId,
      status: "In Transit",
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      totalBill, // Add total bill to the order
    });

    await order.save(); // Save the order to the database
    res.status(201).json({ trackingId, totalBill }); // Respond with the Order ID and total bill
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating order" });
  }
});

// Helper function to generate random timestamps within the same day
function generateCheckpoints() {
  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0
  ); // Start of the day
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59
  ); // End of the day
  const checkpoints = [];
  const checkpointStatuses = [
    "Package received at Rajkot facility",
    "Package departed from Rajkot facility",
    "Package is out for delivery",
    "Package is near your location",
    "Package delivered to your address",
  ];

  let currentTime = startOfDay.getTime(); // Start from the beginning of the day
  for (let i = 0; i < checkpointStatuses.length; i++) {
    const randomMinutes = Math.floor(Math.random() * 60) + 30; // Random interval between 30-90 minutes
    currentTime += randomMinutes * 60 * 1000; // Add random minutes to the current time

    // Ensure the time does not exceed the end of the day
    if (currentTime > endOfDay.getTime()) {
      currentTime = endOfDay.getTime();
    }

    // Convert to IST
    const istTime = new Date(currentTime).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    checkpoints.push({
      time: istTime,
      status: checkpointStatuses[i],
      location: "Rajkot, Gujarat",
    });
  }

  return checkpoints;
}

// Route to track an order with detailed checkpoints and estimated delivery
app.get("/track-order/:trackingId", async (req, res) => {
  try {
    const { trackingId } = req.params;

    // Find the order by tracking ID
    const order = await orderModel.findOne({ trackingId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Generate checkpoints dynamically
    const checkpoints = generateCheckpoints();

    // Respond with the order details and checkpoints
    res.status(200).json({
      trackingId: order.trackingId,
      item: order.item,
      source: order.source,
      destination: order.destination,
      status: order.status,
      estimatedDelivery: checkpoints[checkpoints.length - 1].time, // Last checkpoint time
      checkpoints,
    });
  } catch (error) {
    console.error("Error tracking order:", error);
    res.status(500).json({ message: "Error tracking order" });
  }
});

const PORT = process.env.PORT || 3000;

// Start server only after DB connection succeeds
connectToDataBase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server because DB connection failed:", err.message || err);
    process.exit(1);
  });
