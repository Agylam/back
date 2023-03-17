import {BadRequestError, Body, CurrentUser, Get, JsonController, Param, Put} from 'routing-controllers';
import 'reflect-metadata'
import { days } from '../db.js';

interface ILesson {
    start: string;
    end: string;
}

interface User {
    email: string;
    fullName: string;
}

@JsonController('/schedule')
export class ScheduleController {
    @Put('/:id')
    async save(@CurrentUser({required: true}) user: User, @Body() lessons: ILesson[], @Param('id') id: number) {
        console.log(user);
        const notValid = lessons.filter(e => {
            return typeof (e.start) !== "string" || typeof (e.end) !== "string" || Object.keys(e).length !== 2;
        })
        if (notValid.length != 0) throw new BadRequestError("Element " + JSON.stringify(notValid[0]) + " isn't lesson");
        await days.read()
        days.data?.setDay(id, lessons);
        await days.write();
        return {message: 'Data saved to db.'};
    }

    @Get('/:id')
    async list(@Param('id') id: number) {
        if (id < 0 || id > 6 || isNaN(id)) throw new BadRequestError("ID may be only 0-6 number");
        await days.read();
        const day = days?.data?.getById(id)?.day;
        console.log(JSON.stringify(days.data));
        return day == undefined ? [] : day;
    }
}
