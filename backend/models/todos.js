let todos = [];

export default {
  getAll: () => {
    return todos
  },
  create: title => {
    const newTodo = {
      id: Date.now().toString(),
      title,
      isCompleted: false
    }

    todos = [...todos, newTodo]
    return newTodo
  },
  edit: (id, newTodo) => {
    const targetIndex = todos.findIndex(todo => todo.id === id);
    const isTargetTodoExist = targetIndex !== -1
    if (!isTargetTodoExist) return null
    const updatedTodo = {
      ...todos[targetIndex],
      title: newTodo.title ?? todos[targetIndex].title,
      isCompleted: newTodo.isCompleted ?? todos[targetIndex].isCompleted,
    }
    const newTodos = [
      ...todos.slice(0, targetIndex),
      updatedTodo,
      ...todos.slice(targetIndex + 1),
    ];
    todos = newTodos
    return updatedTodo
  },
  delete: id => {
    const targetIndex = todos.findIndex(todo => todo.id === id);
    const isTargetTodoExist = targetIndex !== -1
    if (!isTargetTodoExist) {
      return null
    }
    const newTodos = [
      ...todos.slice(0, targetIndex),
      ...todos.slice(targetIndex + 1),
    ]
    const deletedTodo = todos[targetIndex]
    todos = newTodos
    return deletedTodo
  }
}