import express from "express";
import {
    addTodoController,
    deleteTodoController,
    getAllTodosController,
    getTodoByIdController,
    updateTodocompletedController,
    updateTodoController,
} from "../../controllers/Todo";

export const TodoRouter = express.Router();

TodoRouter.route("/todoById/:email/:pwd/:id").get(getTodoByIdController);

TodoRouter.route("/allTodos/:email/:pwd").get(getAllTodosController);
TodoRouter.route("/addtodo/:email/:pwd").post(addTodoController);
TodoRouter.route("/updateTodo/:email/:pwd/:id").put(updateTodoController);
TodoRouter.route("/updateTodocompleted/:email/:pwd/:id").put(
    updateTodocompletedController
);
TodoRouter.route("/deleteTodo/:email/:pwd/:id").delete(deleteTodoController);
