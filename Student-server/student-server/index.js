// const express = require("express");
// const app = express();

// const students = [
//   {
//     studentName: "ABDUL HAQUE",
//     University: "SUxCG 714",
//     UniversityUID: "108444"
//   },
//   {
//     studentName: "ADITYA KUMAR",
//     University: "SUxCG 702",
//     UniversityUID: "108716"
//   },
//   {
//     studentName: "AMAN KUMAR",
//     University: "SUxCG 702",
//     UniversityUID: "108500"
//   },
//   {
//     studentName: "AMRIT RAJ",
//     University: "SUxCG 702",
//     UniversityUID: "108587"
//   }
// ];

// app.get("/cg/students", (req, res) => {
//   res.status(200).json(students);
// });

// app.get("/cg/students/:gr_number", (req, res) => {
//   const grNumber = req.params.gr_number;

//   const student = students.find(
//     s => s.UniversityUID === grNumber
//   );

//   if (!student) {
//     return res.status(404).json({
//       message: "Student not found"
//     });
//   }

//   res.status(200).json(student);
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on 3000`);
// });



// const express = require("express");
// const app = express();
// const PORT = 3000;

// const students = [
//   {
//     id: 1,
//     studentName: "ABDUL HAQUE",
//     University: "SUxCG 714",
//     UniversityUID: "108444"
//   },
//   {
//     id: 2,
//     studentName: "ADITYA KUMAR",
//     University: "SUxCG 702",
//     UniversityUID: "108716"
//   },
//   {
//     id: 3,
//     studentName: "AMAN KUMAR",
//     University: "SUxCG 702",
//     UniversityUID: "108500"
//   },
//   {
//     id: 4,
//     studentName: "AMRIT RAJ",
//     University: "SUxCG 702",
//     UniversityUID: "108587"
//   }
// ];


// app.get("/users/:id", (req, res) => {
//   const id = parseInt(req.params.id);

//   const student = students.find((s) => s.id === id);

//   if (student) {
//     res.json(student);
//   } else {
//     res.status(404).json({ message: "User not found" });
//   }
// });


// app.listen(PORT, () => {
//   console.log(`Server running on 3000`);
// });



const express = require("express");

const app = express();

const users = [
  { id: 1, name: "Arjun", role: "student" },
  { id: 2, name: "Priyesha", role: "mentor" }
];


app.get("/", (req, res) => {
  res.send("Express server is running");
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

app.use(express.json());

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    role: req.body.role
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: newUser
  });
});

app.put("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    id: userId,
    name: req.body.name,
    role: req.body.role
  };

  res.status(200).json({
    message: "User replaced",
    user: users[index]
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});