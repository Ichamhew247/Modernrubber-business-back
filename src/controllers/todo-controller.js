const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const { v4: uuidv4 } = require("uuid");
let todos = [
  {
    id: 1,
    taxValue: "MEW2ww",
    priceValue: "MEW",
  },
  {
    id: 2,
    taxValue: "NEW",
    priceValue: "NEW",
  },
];
exports.getTodo = async (req, res, next) => {
  res.send(todos);
};
exports.createTodo = async (req, res, next) => {
  const { taxValue, priceValue } = req.body; // ดึงค่า taxValue และ priceValue จาก req.body

  const todo = {
    // taxValue: req.body.taxValue
    id: uuidv4(),
    taxValue: taxValue,
    priceValue: priceValue,
  };

  todos.push(todo);
  return res.send(todo);
};

exports.deleteTodo = async (req, res, next) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos.splice(index, 1);
  }

  res.send(todos);
};

exports.editTodo = async (req, res, next) => {
  const id = req.params.id;
  const { taxValue, priceValue } = req.body;

  const todoToEdit = todos.find((todo) => todo.id == id);

  todoToEdit.taxValue = taxValue;
  todoToEdit.priceValue = priceValue;
  res.send(todoToEdit);
  // res.json({ message: "Todo updated successfully", todo: todoToEdit });
};
