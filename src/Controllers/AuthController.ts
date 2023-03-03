import { JsonController, Post, Body, HttpError, NotFoundError } from 'routing-controllers';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

interface LoginBody {
  email: string;
  password: string;
}

@JsonController('/auth')
export class AuthController {

  @Post('/login')
  login(@Body() body: LoginBody) {
    const user = { email: body.email };
    if (body.password !== 'password') {
      throw new NotFoundError(`User was not found.`);
    }
    const token = jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return { token };
  }

}

