import { Request, Response } from "express";
import { deleteUserService, insertUser, selectUsers, selectUser, checkEmailExistence, modifyUser } from "../../service/users/users"

export async function getUser(_: Request, response: Response): Promise<any> {
    try {
        const result = await selectUsers();
        return response.status(200).json({ error: false, data: result?.rows });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: true, message: "Error while getting users" })
    }
}

export async function addUser(request: Request, response: Response): Promise<any> {
    const objectUser = request.body;

    try {
        const isEmailExist: boolean = await checkEmailExistence(objectUser.email);

        if (isEmailExist) {
            return response.status(500).json({ error: true, message: "User already exists!" })
        } else {
            const result = await insertUser(objectUser);

            if (result?.rowCount !== 0) {
                return response.status(200).json({ error: false, message: "User added with success!" })
            } else {
                return response.status(500).json({ error: false, message: "Error while adding user !" })
            }
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: true, message: "Error while adding user" });
    }
}

export async function deleteUser(request: Request, response: Response) {
    const objectUser = request.body;

    try {
        const result = await deleteUserService(objectUser);
        return response.status(200).json({ error: false, data: result });
    } catch (error) {
        console.log(error); return response.status(500).json({ error: true, message: "Error while deleting user" });
    }
}

export async function login(request: Request, response: Response) {
    const { email, password } = request.body
    try {
        const result: any = await selectUser(email as string, password as string);

        if (result.length === 0) {
            return response.status(500).json({ error: true, message: "Error while getting users" })
        } else {
            delete result.password
            return response.status(200).json({ error: false, data: result })
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: true, message: "Error while getting users" })
    }
}

export async function updateUser(request: Request, response: Response): Promise<any> {

    const objectUser = request.body;
    console.log(objectUser)

    try {



        const result = await modifyUser(objectUser.firstname, objectUser.lastname, objectUser.email);

        if (result?.rowCount !== 0) {
            return response.status(200).json({ error: false, message: "User modified with success!" })
        } else {
            return response.status(500).json({ error: false, message: "Error while modifying user !" })
        }

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: true, message: "Error while modifying user" });
    }
}