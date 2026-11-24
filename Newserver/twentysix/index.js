const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json()); // important for req.body

mongoose.connect("mongodb://localhost:27017/userLab1")
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Model
const User = mongoose.model("users", userSchema);

// Create User (POST)
app.post("/addusers", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start server
app.listen(3000, () => {
  console.log("Server is running on 3000");
});