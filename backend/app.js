import express from 'express';
import cors from 'cors'

const app = express();
const port = 3000;


app.use(express.json())
app.use(cors({origin: "http://127.0.0.1:5500"}))
let todos = [];

// Get All Todos
app.get("/api/todos", (req, res) => {
  res.json(todos)
})

// Create Todo
app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required and cannot be empty." });
  }

  const newTodo = {
    id: Date.now().toString(),
    title,
    isCompleted: false
  }

  todos = [...todos, newTodo]
  res.status(201).json(newTodo)
})

// Edit {id} Todo
app.put("/api/todos/:id", (req, res) => {
  const targetId = req.params.id
  const targetIndex = todos.findIndex(todo => todo.id === targetId);
  const isTargetTodoExist = targetIndex !== -1

  if (!isTargetTodoExist) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const updatedTodo = {
    ...todos[targetIndex],
    title: req.body.title ?? todos[targetIndex].title,
    isCompleted: req.body.isCompleted ?? todos[targetIndex].isCompleted
  }

  const newTodos = [
      ...todos.slice(0, targetIndex),
      updatedTodo,
      ...todos.slice(targetIndex + 1),
    ];

  todos = newTodos
  res.json(updatedTodo)
})

// Delete {id} Todo
app.delete("/api/todos/:id", (req, res) => {
  const targetId = req.params.id
  const targetIndex = todos.findIndex(todo => todo.id === targetId);
  const isTargetTodoExist = targetIndex !== -1

  if (!isTargetTodoExist) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const newTodos = [
    ...todos.slice(0, targetIndex),
    ...todos.slice(targetIndex + 1),
  ]

  todos = newTodos
  res.status(204).send();
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});