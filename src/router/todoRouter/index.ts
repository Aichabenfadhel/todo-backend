import express from "express";
import {
    addTodoController,
    deleteTodoController,
    getAllTodosController,
    getTodoByIdController,
    updateTodoController,
} from "../../controllers/Todo";

export const TodoRouter = express.Router();

TodoRouter.route("/todoById/:email/:pwd/:id").get(getTodoByIdController);

TodoRouter.route("/allTodos/:email/:pwd").get(getAllTodosController);
TodoRouter.route("/addtodo/:email/:pwd").post(addTodoController);
TodoRouter.route("/updateTodo/:id").put(updateTodoController);
TodoRouter.route("/deleteTodo/:todo_id").delete(deleteTodoController);
