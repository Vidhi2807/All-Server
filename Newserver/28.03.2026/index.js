const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const PORT = 3000;
const SECRET_KEY = "mysecretkey";

// Connect Database
mongoose.connect("mongodb://127.0.0.1:27017/backendClassDB")
   .then(() => {
      console.log("MongoDB Connected Successfully");
   })
   .catch((err) => {
      console.log("Database connection error", err);
   });

// Schema
const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   }
});

// Model
const User = mongoose.model("User", userSchema);

//
// Registration
//
app.post("/users", async (req, res) => {
   const { name, email, password } = req.body;

   try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
         return res.status(400).json({
            msg: "User already exists"
         });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
         name,
         email,
         password: hashedPassword
      });

      await newUser.save();

      res.status(201).json({
         msg: "User Register Done"
      });

   } catch (error) {
      res.status(500).json({
         msg: "Server Error",
         error: error.message
      });
   }
});

//
// Login
//
app.post("/login", async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(404).json({
            msg: "User not found"
         });
      }

      const isPasswordMatch =
         await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
         return res.status(401).json({
            msg: "Invalid password"
         });
      }

      // Generate JWT Token
      const token = jwt.sign(
         { userId: user._id },
         SECRET_KEY,
         { expiresIn: "1h" }
      );

      res.status(200).json({
         msg: "Login successful",
         token: token
      });

   } catch (error) {
      res.status(500).json({
         msg: "There is some error"
      });
   }
});

// Start Server
app.listen(PORT, () => {
   console.log("Server running on port", PORT);
});