const express = require("express");

const todoController = require("../controllers/todo-controller");

const router = express.Router();

router.get("/todolist", todoController.getTodo);
router.post("/todolist", todoController.createTodo);
router.delete("/todolist/:id", todoController.deleteTodo);
router.patch("/editTodolist/:id", todoController.editTodo);

module.exports = router;
