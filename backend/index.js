const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Todo = mongoose.model('Todo', {
    text: String,
    done: Boolean,
});

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const todo = new Todo(req.body);
    await todo.save();
    res.json(todo);
});

app.listen(5000, () => {
    console.log('Backend running on port 5000');
});
