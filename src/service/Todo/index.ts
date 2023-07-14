import { QueryResult } from "pg";
import pool from "../../database";

import { TodoType } from "../../types";

export async function idGenerator() {
    try {
        const sql = "SELECT uuid_generate_v4();";
        const id = await pool.query(sql);
        return id.rows[0].uuid_generate_v4;
    } catch (error) {
        throw error;
    }
}

export async function getOldTodos(email: string, pwd: string) {
    const sql = `select todo::jsonb from public.todoapp WHERE email='${email}' and pwd='${pwd}' `;
    const result = await pool.query(sql);
    return result.rows[0].todo;
}

export async function addTodo(email: string, pwd: string, description: string) {
    try {
        const id = await idGenerator();
        const oldTodo = await getOldTodos(email, pwd);
        const todos: Record<string, TodoType> = {
            ...oldTodo,
            [id]: { description: description, completed: false },
        };
        const todo = JSON.stringify(todos);
        const sql = `
            UPDATE public.todoapp
            SET todo = '${todo}'::jsonb
            WHERE email='${email}' and pwd='${pwd}';`;
        pool.query(sql);
    } catch (error) {
        throw error;
    }
}

export async function getallTodos(
    email: string,
    pwd: string
): Promise<QueryResult<any>> {
    try {
        const alltodosTable = await pool.query(
            `SELECT todo FROM public.todoapp WHERE email='${email}' and pwd='${pwd}' ;`
        );
        return alltodosTable;
    } catch (error) {
        throw error;
    }
}

export async function getTodoById(email: string, pwd: string, id: string) {
    try {
        const sql = `SELECT todo::jsonb->'${id}'
                    FROM public.todoapp
                     WHERE email='${email}' and pwd='${pwd}' ;`;

        const todotable = await pool.query(sql);
        return todotable.rows[0].todo;
    } catch (error) {
        throw error;
    }
}

export async function updateTodo(
    email: string,
    pwd: string,
    id: string,
    description: string
) {
    try {
        const sql = `
        UPDATE public.todoapp
        SET todo = jsonb_set(todo, '{${id}, description}', '"${description}"')
        WHERE email = '${email}' AND pwd = '${pwd}';
        `;

        await pool.query(sql);
    } catch (error) {
        throw error;
    }
}
export async function updateTodocompleted(
    email: string,
    pwd: string,
    id: string,
    completed: boolean
) {
    try {
        const sql = `
        UPDATE public.todoapp
        SET todo = jsonb_set(todo, '{${id}, completed}', '${completed}')
        WHERE email = '${email}' AND pwd = '${pwd}';
        `;

        await pool.query(sql);
    } catch (error) {
        throw error;
    }
}

export async function deleteTodo(email: string, pwd: string, id: string) {
    try {
        pool.query(`
        UPDATE public.todoapp
        SET todo = todo - '${id}'
        WHERE email= '${email}' AND pwd = '${pwd}';
        `);
    } catch (error) {
        throw error;
    }
}
