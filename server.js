const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/yourDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Define a schema & model
const DataSchema = new mongoose.Schema({ name: String, value: String });
const DataModel = mongoose.model("Data", DataSchema);

// Sample API route
app.post("/add", async (req, res) => {
    const { name, value } = req.body;
    try {
        const newData = new DataModel({ name, value });
        await newData.save();
        res.json({ message: "Data added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/data", async (req, res) => {
    const data = await DataModel.find();
    res.json(data);
});

app.listen(3000, () => console.log("Server running on port 3000"));

