const mongoose = require("mongoose");

const connectToDataBase = async () => {
    const defaultUri = "mongodb://127.0.0.1:27017/Swiftery";
    const uri = process.env.MONGO_URI && process.env.MONGO_URI.trim() !== "" ? process.env.MONGO_URI : defaultUri;
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the database successfully!");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        // rethrow so caller can handle the failure and avoid starting the server
        throw error;
    }
};

module.exports = connectToDataBase;