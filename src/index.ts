import { createExpressServer } from 'routing-controllers';
import { UserController } from './Controllers/UserController';
const app = createExpressServer({
  controllers: [UserController], 
});
app.listen(3000);