const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(bodyParser.json());
// Serve static files from the Frontend folder
app.use(express.static(path.join(__dirname, "..")));
app.use(bodyParser.urlencoded({ extended: true })); // Specify the extended option
// app.use(express.static('Website')); // Serve static files from the Website directory

app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/yourDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Define a schema & model
const DataSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastLogin: { type: Date, default: Date.now } // Add lastLogin field
});

const UserModel = mongoose.model("User", DataSchema); // Change model name for clarity

// Sample API route
app.post("/add", async (req, res) => {
    const { name, email, password } = req.body; // Ensure all fields are included
    const newUser = new UserModel({ name, email, password }); // Create a new user instance

    try {
        await newUser.save(); // Save the new user to the database
        res.json({ message: "User added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve the homepage index file and start server on port 5555
app.get("/", (req, res) => {
  // Allow cross-origin for development testing (adjust for production)
  res.set({
    "Access-Control-Allow-Origin": "*",
  });
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = 5555;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

console.log("On port", PORT);

app.post("/login", async (req, res) => {
    const { email, password } = req.body; // Declare email and password only once
    try {
        const user = await UserModel.findOne({ email, password }); // Check user credentials

        if (user) {
            // Update last login timestamp
            await UserModel.findByIdAndUpdate(user._id, { lastLogin: Date.now() });
            res.json({ message: "Login successful", user });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, { name, email, password }, { new: true });
        res.json({ message: "User updated successfully", updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await UserModel.findByIdAndDelete(id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
