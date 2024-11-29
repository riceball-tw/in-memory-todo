
# in-memory todo list app

This is a simple in-memory Express.js app providing basic CRUD operations for a to-do list, along with a simple frontend for displaying and managing tasks.

For a detailed implementation guide, refer to [Creating a Simple CRUD Todo List with Express.js](https://www.webdong.dev/en/post/expressjs-basic-crud-todolist/)

| Method | Path                     | Purpose                                          |
| ------ | ------------------------ | ------------------------------------------------ |
| GET    | /api/todos               | Get All Todos                                    |
| POST   | /api/todos               | Create Todo                                      |
| PUT    | /api/todos/:id           | Edit {id} Todo                                   |
| DELETE | /api/todos/:id           | Delete {id} Todo                                 |

> [!WARNING]  
> This app uses in-memory storage, meaning data will not persist after the server restarts. It's ideal for learning or prototyping purposes.
