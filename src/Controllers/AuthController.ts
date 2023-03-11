import { JsonController, Post, Body, NotFoundError } from "routing-controllers";
import { AsyncAdapter, NodeProvider } from "@stenodb/node";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { UsersEntity } from "../Entities/UsersEntity.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

const path = resolve(dirname(fileURLToPath(import.meta.url)), "..", "db");
const adapter = new AsyncAdapter("users", UsersEntity);
const provider = new NodeProvider({ path });
const usersData = await provider.create(adapter);

usersData.read();
dotenv.config();

interface LoginBody {
    email: string;
    password: string;
}

@JsonController("/auth")
export class AuthController {
    @Post("/login")
    async login(@Body() body: LoginBody) {
        let user = usersData.data?.getByEmail(body.email);
        if (!user) throw new NotFoundError(`User was not found.`);
        let match: boolean = await bcrypt.compare(body.password, user.password);
        if (!match) throw new NotFoundError(`User was not found.`);
        const token = jwt.sign(
            {email: user.email, fullName: user.fullName},
            process.env.JWT_SECRET as string,
            {expiresIn: "1h"}
        );
        return { token };
    }
}
