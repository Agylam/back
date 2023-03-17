import {Database} from "./db.js";
const db = new Database("./database.db");
interface IUser{
    id:number;
    email:string;
    password:string;
    fullName:string;
}
db.query<IUser>("SELECT * FROM users WHERE email = ?",["qqq"]).then((a)=>{
    console.log(a?.password);
});