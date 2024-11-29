import express from 'express';
import todoController from '../controllers/todos.js'

const router = express.Router()


// Get All Todos
router.get("/", todoController.getAllTodos)

// Create Todo
router.post("/", todoController.createTodo)

// Edit {id} Todo
router.put("/:id", todoController.editTodo)

// Delete {id} Todo
router.delete("/:id", todoController.deleteTodo)

export default router