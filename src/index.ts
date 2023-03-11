import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import dotenv from "dotenv";

import { AuthController } from "./Controllers/AuthController.js";
import { ScheduleController } from "./Controllers/ScheduleController.js";

dotenv.config();

createExpressServer({
    controllers: [AuthController, ScheduleController],
    cors:{
        origin: process.env.ORIGIN,
        methods: process.env.METHODS,
        allowedHeaders: process.env.ALLOWEDHEADERS,
    }
}).listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT);
});
