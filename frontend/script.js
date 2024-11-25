const todoForm = document.querySelector("[data-todo-form]");
const todoList = document.querySelector("[data-todo-list]");
const todoUri = 'http://localhost:3000/api/todos'

let todos = []
init()

todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newTodo = await addTodo(e.target.userInput.value)
  todos = [
    ...todos,
    newTodo
  ];
  renderTask(todos);
  e.target.reset();
});

todoList.addEventListener("click",  (e) => {
  const targetId = e.target.parentElement.getAttribute("task-id");

  // Click Delete
  if (e.target.hasAttribute("data-task-delete")) {
     deleteTodo(targetId)
    todos = todos.reduce((prev, curr) => {
      if (curr.id === targetId) {
        return prev;
      }
      return [...prev, curr];
    }, []);
    renderTask(todos);
  }

  // Click Toggle Todo complete status
  if (e.target.hasAttribute("data-task-toggle")) {
    const targetTodo = todos.find(todo => todo.id === targetId)

    editTodo({
      id: targetId,
      title: targetTodo.title,
      isCompleted: !targetTodo.isCompleted
    });

    todos.forEach((todo) => {
      if (todo.id === targetId) {
        todo.isCompleted = !todo.isCompleted;
      }
    });

  }
});

async function init() {
  const newTodos = await getTodos()
  todos = newTodos
  renderTask(todos)
}

async function getTodos() {
  try {
    const res = await fetch(todoUri)
    if (!res.ok) throw res
    return await res.json()
  } catch (err) {
    console.error(err)
  }
} 

async function addTodo(title) {
  try {
    const res = await fetch(todoUri, 
      {
        method: "POST", 
        body: JSON.stringify({ title }),
        headers: new Headers({
          "Content-Type": "application/json",
        })
      })
    if (!res.ok) throw res
    return await res.json()
  } catch (err) {
    console.error(err)
  }
}

async function editTodo({id, title, isCompleted}) {
  try {
    const res = await fetch(`${todoUri}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, isCompleted }),
      headers: new Headers({
        "Content-Type": "application/json",
      })
    })
    if (!res.ok) throw res
  } catch (err) {
    console.error(err)
  }
}

async function deleteTodo(id) {
  try {
    const res = await fetch(`${todoUri}/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw res
  } catch (err) {
    console.error(err)
  }
}

function renderTask(todos) {
  const todosHTML = todos.map(
    (todo) => `
  <li task-id=${todo.id}>
    <input id=${todo.id} data-task-toggle type="checkbox" ${
      todo.isCompleted ? "checked" : ""
    }>
    <label for=${todo.id}>${todo.title}</label>
    <button data-task-delete>刪除</button>
  </li>
  `
  );
  todoList.innerHTML = todosHTML.join("");
}