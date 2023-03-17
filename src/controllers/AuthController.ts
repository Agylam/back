import {JsonController, Post, Body, NotFoundError} from "routing-controllers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { users } from "../db.js";

interface ILoginBody {
    email: string;
    password: string;
}

@JsonController("/auth")
export class AuthController {
    @Post("/login")
    async login(@Body() body: ILoginBody) {
        await users.read();
        let user = users.data?.getByEmail(body.email);
        if (!user) throw new NotFoundError(`User was not found.`);
        let match: boolean = await bcrypt.compare(body.password, user.password);
        if (!match) throw new NotFoundError(`User was not found.`);
        const token = jwt.sign(
            {email: user.email, fullName: user.fullName},
            process.env.JWT_SECRET as string,
            {expiresIn: "1h"}
        );
        return {token};
    }
}
