import express, { Application } from "express";
import { config } from "dotenv";
import http from "http";

import registerRouter from "./router";
import registerMiddlewares from "./middlewares";
import env from "dotenv";

env.config();

const app: Application = express();
const httpServer = http.createServer(app);

registerMiddlewares(app);
registerRouter(app);

const PORT: string | number = process.env.PORT || 7000;
const ENV: string = process.env.NODE_ENV || "development";

httpServer.listen(PORT, () =>
    console.log(
        ` 📡 Backend server: ` + ` Running in ${ENV} mode on port ${PORT}`
    )
);
