import express from "express";

import {
    addUserController,
    getUsersController,
    deleteUserController,
    // login,
    userLoginController,
} from "../../controllers/users/userController";

const usersRouter = express.Router();

usersRouter.route("/delete").delete(deleteUserController);
usersRouter.route("/adduser").post(addUserController);
usersRouter.route("/users").get(getUsersController);
// usersRouter.route("/login").post(login);
usersRouter.route("/getUser/:email/:pwd").get(userLoginController);
export default usersRouter;
