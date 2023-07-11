import express from "express";
import {
    addTodoController,
    deleteTodoController,
    getAllTodosController,
    getTodoByIdController,
    updateTodoController,
} from "../../controllers/Todo";

export const TodoRouter = express.Router();

TodoRouter.route("/todoById/:todo_id").get(getTodoByIdController);

TodoRouter.route("/allTodos").get(getAllTodosController);
TodoRouter.route("/addtodo").post(addTodoController);
TodoRouter.route("/updateTodo/:todo_id").put(updateTodoController);
TodoRouter.route("/deleteTodo/:todo_id").delete(deleteTodoController);
