const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "adventure-journal",
});

const adventureSchema = new mongoose.Schema({
  name: String,
  location: String,
});

const Adventure = mongoose.model("adventures", adventureSchema);

app.get("/api/adventures", async (req, res) => {
  try {
    const adventures = await Adventure.find();
    res.json(adventures);
  } catch (error) {
    console.error("Error fetching adventures:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/adventures/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const adventure = await Adventure.findById(id);
    if (!adventure) {
      return res.status(404).json({ error: "Adventure not found" });
    }
    res.json(adventure);
  } catch (error) {
    console.error("Error fetching adventure:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/adventures", async (req, res) => {
  try {
    const { name, location } = req.body;
    const newAdventure = new Adventure({ name, location });
    await newAdventure.save();
    res.status(201).json(newAdventure);
  } catch (error) {
    console.error("Error creating adventure:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/adventures/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location } = req.body;
    const updatedAdventure = await Adventure.findByIdAndUpdate(
      id,
      { name, location },
      { new: true }
    );
    res.json(updatedAdventure);
  } catch (error) {
    console.error("Error updating adventure:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/adventures/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Adventure.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting adventure:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
