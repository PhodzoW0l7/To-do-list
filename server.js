const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Connect to MongoDB using an environment variable
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, {});
} else {
  mongoose.connect(
    "mongodb+srv://Phodzo:Phodzo24@mern.e2ocybl.mongodb.net/?retryWrites=true&w=majority&appName=mern",
    {}
  );
}

// Define a Task schema and model
const taskSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: Date,
});
const Task = mongoose.model("Task", taskSchema);

// Get all tasks
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
});

// Add a new task
app.post("/api/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).json(newTask);
});

// Delete a task
app.delete("/api/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Update a task
app.put("/api/tasks/:id", async (req, res) => {
  const { completed } = req.body;
  await Task.findByIdAndUpdate(req.params.id, { completed });
  res.status(200).send();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
