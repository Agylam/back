import { JsonController, Post, Body } from 'routing-controllers';
import jwt from 'jsonwebtoken';

interface LoginBody {
  email: string;
  password: string;
}

@JsonController('/auth')
export class AuthController {
  private readonly JWT_SECRET: string = 'supersecretkey';

  @Post('/login')
  async login(@Body() body: LoginBody) {
    // Here you would check the user credentials against a database or other source
    // For demonstration purposes, we will just create a fake user with a password of "password"
    const user = { email: body.email };
    if (body.password !== 'password') {
      throw new Error('Incorrect password');
    }

    // If the user credentials are valid, generate a JWT token
    const token = jwt.sign({ email: user.email }, this.JWT_SECRET, { expiresIn: '1h' });

    // Return the token to the client
    return { token };
  }
}
