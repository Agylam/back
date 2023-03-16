import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import dotenv from "dotenv";

import { AuthController } from "./controllers/AuthController.js";
import { ScheduleController } from "./controllers/ScheduleController.js";

dotenv.config();

createExpressServer({
    controllers: [AuthController, ScheduleController],
    cors:{
        origin: process.env.CORS_ORIGIN,
        methods: process.env.CORS_METHODS,
        allowedHeaders: process.env.CORS_ALLOWEDHEADERS,
    }
}).listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT);
});
