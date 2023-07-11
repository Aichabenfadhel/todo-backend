import pool from "../../database";
import { UserType } from "../../types/index";

export async function selectUsers() {
    try {
        const result = await pool.query(`SELECT * FROM public.users`);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function insertUser(objectUser: UserType) {
    try {
        return await pool.query(`
            INSERT INTO public.users (firstname, lastname, email, password)
            VALUES (
                '${objectUser.firstname}',
                '${objectUser.lastname}',
                '${objectUser.email}',
                '${objectUser.password}'
            )
        `);
    } catch (error) {
        console.log(error);
    }
}

export async function deleteUserService(objectUser: UserType) {
    try {
        return await pool.query(
            `DELETE  FROM public.users WHERE email='${objectUser.email}' yarnyar`
        );
    } catch (error) {
        console.log(error);
    }
}

export async function selectUser(email: string, password: string) {
    try {
        const result = await pool.query(
            `SELECT * FROM public.users WHERE email='${email}' and password='${password}'`
        );
        return result.rows[0];
    } catch (error) {
        console.log(error);
    }
}

export async function checkEmailExistence(email: string): Promise<boolean> {
    try {
        const result = await pool.query(
            `SELECT * FROM public.users WHERE email='${email}'`
        );

        return result.rows.length > 0 ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export async function modifyUser(firstname: string, lastname: string, email: string) {
    try {
        let sql = `
        UPDATE public.users
       SET firstname = '${firstname}' , lastname = '${lastname}'
       WHERE email='${email}' `

        return await pool.query(sql);
    } catch (error) {
        console.log(error);
    }
}