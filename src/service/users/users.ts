import pool from "../../database";
import { UserType } from "../../types/index";

export async function selectUsers() {
    try {
        const result = await pool.query(`SELECT * FROM public.todoapp`);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function insertUser(
    firstname: string,
    lastname: string,
    email: string,
    pwd: string
) {
    try {
        const sql = `
        INSERT INTO public.todoapp (firstname, lastname, email, pwd)
        VALUES (
            '${firstname}',
            '${lastname}',
            '${email}',
            '${pwd}'
        )
    `;
        return await pool.query(sql);
    } catch (error) {
        console.log(error);
    }
}

export async function deleteUserService(email: string) {
    try {
        return await pool.query(
            `DELETE  FROM public.todoapp WHERE email='${email}' ;`
        );
    } catch (error) {
        console.log(error);
    }
}

export async function selectUser(email: string, password: string) {
    try {
        const result = await pool.query(
            `SELECT * FROM public.todoapp WHERE email='${email}' and pwd='${password}'`
        );
        return result.rows[0];
    } catch (error) {
        console.log(error);
    }
}

export async function checkEmailExistence(email: string): Promise<boolean> {
    try {
        const result = await pool.query(
            `SELECT * FROM public.todoapp WHERE email='${email}'`
        );

        return result.rows.length > 0 ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function checkPasswordValidation(
    password: string
): Promise<boolean> {
    try {
        const result = await pool.query(
            `SELECT * FROM public.todoapp WHERE email='${password}'`
        );

        return result.rows.length > 0 ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}
