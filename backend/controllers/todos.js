import todoModel from '../models/todos.js'

export default {
  getAllTodos: (req, res) => {
    return res.json(todoModel.getAll())
  },
  createTodo: (req, res) => {
    const { title } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required and cannot be empty." });
    }
    return res.status(201).json(todoModel.create(title));
  },
  editTodo: (req, res) => {
    const targetId = req.params.id
    const updatedTodo = todoModel.edit(targetId, {
      title: req.body.title,
      isCompleted: req.body.isCompleted
    })
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    return res.status(200).json(updatedTodo);
  },
  deleteTodo: (req, res) => {
    const deletedTodo = todoModel.delete(req.params.id)

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(204).send();
  }
}