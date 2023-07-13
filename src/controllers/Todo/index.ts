import { Request, Response } from "express";
import {
    addTodo,
    deleteTodo,
    getTodoById,
    getallTodos,
    updateTodo,
    updateTodocompleted,
} from "../../service/Todo";

//Create a todo

export async function addTodoController(req: Request, res: Response) {
    try {
        const { description } = req.body;
        const { email, pwd } = req.params;

        await addTodo(email, pwd, description);

        return res.status(200).json({
            error: false,
            message: "Todo added with succes",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "Error while adding todo" });
    }
}

//get all todos

export async function getAllTodosController(req: Request, res: Response) {
    try {
        const { email, pwd } = req.params;

        const todosTable = await getallTodos(email, pwd);
        return res.status(200).json({
            error: false,
            data: todosTable.rows,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "Error while getting todos " });
    }
}

//get a todo

export async function getTodoByIdController(req: Request, res: Response) {
    try {
        const { email, pwd, id } = req.params;
        const todotable = await getTodoById(email, pwd, id);

        return res.status(200).json({
            error: false,
            data: todotable,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "Error while getting todos " });
    }
}

//update a todo

export async function updateTodoController(req: Request, res: Response) {
    try {
        const { email, pwd, id } = req.params;
        const { description } = req.body;
        await updateTodo(email, pwd, id, description);
        return res.status(200).json({
            error: false,
            message: "Todo was updated !",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "Error while updating todo " });
    }
}
export async function updateTodocompletedController(
    req: Request,
    res: Response
) {
    try {
        const { email, pwd, id } = req.params;
        const { completed } = req.body;
        await updateTodocompleted(email, pwd, id, completed);
        return res.status(200).json({
            error: false,
            message: "Todo completed was updated !",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "Error while updating todo " });
    }
}

//delete a todo

export async function deleteTodoController(req: Request, res: Response) {
    try {
        const { email, pwd, id } = req.params;
        await deleteTodo(email, pwd, id);
        return res.status(200).json({
            error: false,
            message: "Todo was deleted !",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "Error while deleting todo" });
    }
}

// export async function login(request: Request, response: Response) {
//     const { email, password } = request.body;
//     try {
//         const result: any = await selectUser(
//             email as string,
//             password as string
//         );

//         if (result.length === 0) {
//             return response
//                 .status(500)
//                 .json({ error: true, message: "Error while getting users" });
//         } else {
//             delete result.password;
//             return response.status(200).json({ error: false, data: result });
//         }
//     } catch (error) {
//         console.log(error);
//         return response
//             .status(500)
//             .json({ error: true, message: "Error while getting users" });
//     }
// }
