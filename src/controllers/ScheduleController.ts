import {BadRequestError, Body, CurrentUser, Get, JsonController, NotFoundError, Param, Put} from 'routing-controllers';
import 'reflect-metadata'
import {Database} from "../db.js";
import {IUser} from "../interfaces/IUser.js";
import {ILesson, ILessonDB} from "../interfaces/ILesson.js";

const DB = new Database(process.env.DB_PATH as string);
@JsonController('/schedule')
export class ScheduleController {
    @Put('/:id')
    async save(@CurrentUser({required: true}) user: IUser, @Body() lessons: ILesson[], @Param('id') id: number) {
        // console.log(user);
        // const notValid = lessons.filter(e => {
        //     return typeof (e.start) !== "string" || typeof (e.end) !== "string" || Object.keys(e).length !== 2;
        // })
        // if (notValid.length != 0) throw new BadRequestError("Element " + JSON.stringify(notValid[0]) + " isn't lesson");
        // await days.read()
        // days.data?.setDay(id, lessons);
        // await days.write();
        return {message: 'Data saved to db.'};
    }

    @Get('/:day')
    async list(@Param('day') day: number) {
        if (day < 0 || day > 6 || isNaN(day)) throw new BadRequestError("Day may be only 0-6 number");
        return await DB.queryAll<ILessonDB[]>("SELECT * FROM schedule WHERE day = ?",[day+""]).then( async (lessons)=>{
            return lessons?.map(i=>{return{start:i.start,end:i.end}});
        })
    }
}
