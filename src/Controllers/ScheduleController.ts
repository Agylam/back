import {Body, Get, JsonController, Put} from 'routing-controllers';
import 'reflect-metadata'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {AsyncAdapter, NodeProvider} from '@stenodb/node'
import {DayEntity} from "../Entities/DayEntity";
import {LessonEntity} from "../Entities/LessonEntity";

interface ILesson {
    start: string;
    end: string;
}

@JsonController('/schedule')
export class ScheduleController {

    @Put('/save')
    async save(@Body() data: ILesson[]) {
        const lessons = data;

        const path = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'db');
        const adapter = new AsyncAdapter('day', DayEntity);
        const provider = new NodeProvider({path});
        const db = await provider.create(adapter);

        await db.read();
        await db.data?.setDay(lessons);
        await db.write();
        return {message: 'Data saved to file.'};
    }
    @Get('/get')
    async get() {
        const path = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'db')
        const adapter = new AsyncAdapter('day', DayEntity)
        const provider = new NodeProvider({path})
        const db = await provider.create(adapter)

        await db.read()
        return db.data;
    }

}