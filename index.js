import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({});
const app = express();
app.use(cors());
const port = 3000;
app.use(express.json());
import { todoModel } from "./db.js";
import { connectDB } from "./model.js";

connectDB();
app.get("", async (req, res) => {
  const todo = await todoModel.find();
  res.json(todo);
});

app.post("/create", async (req, res) => {
  const title = req.body.title;
  const desrciption = req.body.desrciption;

  await todoModel.create({
    title,
    desrciption,
  });
  res.send("created success");
});

app.put("/put", async (req, res) => {
  const todoId = req.body.id; // Get the ID from the URL parameter
  const { title, description } = req.body; // Get the fields to update from the request body

  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(
      todoId,
      { title, description }, // The fields to update
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).send("Todo item not found");
    }

    res.json({ message: "Todo updated successfully", updatedTodo });
  } catch (error) {
    res.status(500).send("Error updating todo item");
  }
});

app.delete("/delete/", async (req, res) => {
  const todoId = req.body.todoId;

  try {
    const deletedTodo = await todoModel.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).send("Todo item not found");
    }

    res.json({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    res.status(500).send("Error deleting todo item");
  }
});

app.listen(port);
