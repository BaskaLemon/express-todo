import express from "express";

const app = express();
app.use(express.json());

const todos = [{ id: 1, name: "Sereh", checked: true }];

app.get("/", (req, res) => {
  return res.send(todos);
});

app.post("/", (req, res) => {
  const { name, checked } = req.body;
  const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
  const newTodo = {
    id: newId,
    name,
    checked,
  };

  todos.push(newTodo);
  return res.send(newTodo);
});
app.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, checked } = req.body;

  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).send({ message: "Todo not found" });
  }

  if (name !== undefined) todo.name = name;
  if (checked !== undefined) todo.checked = checked;

  return res.send(todo);
});
app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = todos.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).send({ message: "Todo not found" });
  }

  const deletedTodo = todos.splice(index, 1);

  return res.send(deletedTodo[0]);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((item) => item.id == id);
  if (!todo) {
    return res.status(404).send({ message: "Not found" });
  }
  return res.send(todo);
});

app.listen(5500, () => {
  console.log("App is running on http://localhost:5500");
});

// TODO:
// id, name, checked

// REST API
// USTGAH
// ZASAH
