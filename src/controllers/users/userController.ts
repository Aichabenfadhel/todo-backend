import { Request, Response } from "express";
import {
    deleteUserService,
    insertUser,
    selectUsers,
    selectUser,
    checkEmailExistence,
    checkPasswordValidation,
} from "../../service/users/users";

export async function getUsersController(
    _: Request,
    response: Response
): Promise<any> {
    try {
        const result = await selectUsers();
        return response.status(200).json({ error: false, data: result?.rows });
    } catch (error) {
        console.log(error);
        return response
            .status(500)
            .json({ error: true, message: "Error while getting users" });
    }
}

export async function addUserController(
    request: Request,
    response: Response
): Promise<any> {
    const { firstname, lastname, email, pwd } = request.body;

    try {
        const isEmailExist: boolean = await checkEmailExistence(email);

        if (isEmailExist) {
            return response
                .status(500)
                .json({ error: true, message: "User already exists!" });
        } else {
            const result = await insertUser(firstname, lastname, email, pwd);

            if (result?.rowCount !== 0) {
                return response.status(200).json({
                    error: false,
                    message: "User added with success!",
                });
            } else {
                return response.status(500).json({
                    error: false,
                    message: "Error while adding user !",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return response
            .status(500)
            .json({ error: true, message: "Error while adding user" });
    }
}

export async function deleteUserController(
    request: Request,
    response: Response
) {
    const { email } = request.body;

    try {
        const result = await deleteUserService(email);
        return response.status(200).json({ error: false, data: result });
    } catch (error) {
        console.log(error);
        return response
            .status(500)
            .json({ error: true, message: "Error while deleting user" });
    }
}

export async function userLoginController(req: Request, res: Response) {
    const { email, pwd } = req.params;

    // const Email:string=email.slice(1)
    // const Pwd:string=pwd.slice(1)
    const checkemail = await checkEmailExistence(email);
    if (checkemail) {
        try {
            const checkpassword = await checkPasswordValidation(pwd);

            if (checkpassword) {
                const result = await selectUser(email, pwd);
                return res.status(200).json({
                    error: false,
                    message: "Getting user successfully",
                    data: result.rows,
                });
            } else {
                return res.status(200).json({
                    error: true,
                    message: "Verify your password",
                });
            }
        } catch (error: any) {
            console.log(error);
            return res
                .status(200)
                .json({ error: true, message: "Error while getting users" });
        }
    } else {
        return res.status(200).json({
            error: true,
            message: "Error User's email doesn't exist",
        });
    }
}

// export async function login(request: Request, response: Response) {
//     const { email, password } = request.body;
//     try {
//         const checkemail = await checkEmailExistence(email);
//         if (checkemail) {
//             const checkpassword = await checkPasswordValidation(password);

//             if (checkpassword) {
//                 const result: any = await selectUser(email, password);

//                 if (result.length === 0) {
//                     return response.status(200).json({
//                         error: true,
//                         message: "Error while getting users",
//                     });
//                 } else {
//                     delete result.password;
//                     return response
//                         .status(200)
//                         .json({ error: false, data: result });
//                 }
//             } else {
//                 return response.status(200).json({
//                     error: true,
//                     message: "Verify your password",
//                 });
//             }
//         } else {
//             return response.status(200).json({
//                 error: true,
//                 message: "Error User's email doesn't exist",
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         return response
//             .status(200)
//             .json({ error: true, message: "Error while getting users" });
//     }
// }
