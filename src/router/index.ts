import { Application, Request, Response } from "express";
import path from "path";

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { TodoRouter } from "./todoRouter";
import usersRouter from "./users/usersRouter";

export default (app: Application): void => {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "MY API",
                version: "1.0.0",
                description:
                    "This page is dedicated to the route list in the application",
            },
            servers: [
                {
                    url: "http://localhost:7000/api_ToDo/v1",
                },
            ],
        },
        apis: [
            `${__dirname}/*${path.extname(path.basename(__filename))}`,
            `${__dirname}/*/*${path.extname(path.basename(__filename))}`,
            `${__dirname}/*/*/*${path.extname(path.basename(__filename))}`,

            `${__dirname}/*.yml`,
            `${__dirname}/*/*.yml`,
            `${__dirname}/*/*/*.yml`,
        ],
    };
    const specs = swaggerJsDoc(options);

    app.use("/api_ToDo/v1/docs", swaggerUI.serve, swaggerUI.setup(specs));

    app.get("/", (_: Request, response: Response) => {
        response.json({ message: "API Running ! " });
    });

    app.use("/api_ToDo/v1", [TodoRouter, usersRouter]);
};
