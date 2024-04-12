// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS middleware
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "adventure-journal",
});

// Create adventure schema and model using mongoose
const adventureSchema = new mongoose.Schema({
  name: String,
  location: String,
});

const Adventure = mongoose.model("adventures", adventureSchema);

// API endpoint to get adventures
app.get("/api/adventures", async (req, res) => {
  try {
    const adventures = await Adventure.find();
    console.log("adventures", adventures);
    res.json(adventures);
  } catch (error) {
    console.error("Error fetching adventures:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
