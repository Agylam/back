import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import dotenv from "dotenv";

import {AuthController} from "./Controllers/AuthController";
import {ScheduleController} from "./Controllers/ScheduleController";

dotenv.config();

createExpressServer({
  controllers: [AuthController,ScheduleController],
}).listen(process.env.PORT, ()=>{
  console.log("Server started on port " + process.env.PORT)
});