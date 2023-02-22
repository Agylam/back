import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import path from 'path';
import { dirname } from 'node:path';
import dotenv from "dotenv";

dotenv.config();

createExpressServer({
  controllers: [path.join(dirname + '/controllers/*.js')],
}).listen(process.env.PORT, ()=>{
  console.log("Server started on port " + process.env.PORT)
});