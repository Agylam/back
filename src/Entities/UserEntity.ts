export class UserEntity {
    email: string;
    password: string;
    fio: string;

    constructor(username: string, password: string, fio: string) {
        this.email = username;
        this.password = password;
        this.fio = fio;
    }
}
