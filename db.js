import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  title: String,
  desrciption: String,
});

const todoModel = mongoose.model("todo", todoSchema);

export { todoModel };
