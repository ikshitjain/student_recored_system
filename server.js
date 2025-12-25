const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB Atlas Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => {
    console.error("❌ MongoDB Connection Failed", err);
    process.exit(1);
  });

// Schema + Model
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String
});

const Student = mongoose.model("Student", studentSchema);

// Routes
app.post("/api/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Student added successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add student" });
  }
});

app.get("/api/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.put("/api/students/:id", async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Student updated!" });
});

app.delete("/api/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted!" });
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
