export class UserEntity {
    email: string;
    password: string;
    fullName: string;

    constructor(username: string, password: string, fullName: string) {
        this.email = username;
        this.password = password;
        this.fullName = fullName;
    }
}
