const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/myapp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use(express.json());

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    minlength:[2,"Name must be at least 2 character"],
  },
  email:{
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    unique: true
  },
  password:{
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 character"]
  },
  role:{
    type: String,
    enum:["Student", "Mentor", "Admin"],
    default : "Mentor"
}
})

const User = mongoose.model("user",userSchema)

app.post("/add-users", async (req, res) => {

    const { name, email, password, role } = req.body;

    if(!name){
        return res.json({error: "Name is required"})
    }
    if(!email){
        return res.json({error: "Email is required"})
    }
    if(!password){
        return res.json({error: "Password is required"})
    }
    if(!role){
        return res.json({error: "Role is required"})
    }

  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.json({ error: err.message });
    }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});