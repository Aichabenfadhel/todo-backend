import { QueryResult } from "pg";
import pool from "../../database";

export async function addTodo(description: string) {
    try {
        const sql = `INSERT INTO public.todo(
             description)
            VALUES ('${description}' )`;

        pool.query(sql);
    } catch (error) {
        throw error;
    }
}

export async function getallTodos(): Promise<QueryResult<any>> {
    try {
        const alltodosTable = await pool.query("SELECT * FROM public.todo;");

        return alltodosTable;
    } catch (error) {
        throw error;
    }
}

export async function getTodoById(id: number) {
    try {
        const sql = `SELECT *
                    FROM public.todo
                     WHERE todo_id='${id}';`;

        const todotable = pool.query(sql);
        console.log(todotable);
        return todotable;
    } catch (error) {
        throw error;
    }
}

export async function updateTodo(description: string, id: number) {
    try {
        pool.query(`UPDATE public.todo
        SET  description='${description}'
        WHERE todo_id='${id}'`);
    } catch (error) {
        throw error;
    }
}

export async function deleteTodo(id: number) {
    try {
        pool.query(`
        DELETE FROM public.todo
	    WHERE todo_id='${id}';
        `);
    } catch (error) {
        throw error;
    }
}
