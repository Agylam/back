import {BadRequestError, Body, Get, JsonController, Param, Put} from 'routing-controllers';
import 'reflect-metadata'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {AsyncAdapter, NodeProvider} from '@stenodb/node'
import {DaysEntity} from "../Entities/DaysEntity";
import {LessonEntity} from "../Entities/LessonEntity";
import {DayEntity} from '../Entities/DayEntity';

interface ILesson {
    start: string;
    end: string;
}

const path = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'db')
const initialData = new DaysEntity([new DayEntity([new LessonEntity("10:00", "16:00")])])
const adapter = new AsyncAdapter('days', DaysEntity, initialData);
const provider = new NodeProvider({path})
const db = await provider.create(adapter);

@JsonController('/schedule')
export class ScheduleController {

    @Put('/:id')
    async save(@Body() lessons: ILesson[], @Param('id') id: number) {
        const notValid = lessons.filter(e => {
            return typeof (e.start) !== "string" || typeof (e.end) !== "string" || Object.keys(e).length !== 2;
        })
        if (notValid.length != 0) throw new BadRequestError("Element " + JSON.stringify(notValid[0]) + " isn't lesson");
        await db.read()
        await db.data?.setDay(id, lessons);
        await db.write();
        return {message: 'Data saved to db.'};
    }

    @Get('/:id')
    async list(@Param('id') id: number) {
        if (id < 0 || id > 6 || isNaN(id)) throw new BadRequestError("ID may be only 0-6 number");
        await db.read();
        console.log(typeof (id))
        const day = db?.data?.getById(id)?.day;
        return day == undefined ? [] : day;
    }

}