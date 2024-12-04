import express from 'express';
import cors from 'cors'
import todoRouter from './routes/todos.js'

const app = express();
const port = 3000;


app.use(express.json())
app.use(cors({origin: "http://127.0.0.1l:5500"}))

// Routes
app.use('/api/todos', todoRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});