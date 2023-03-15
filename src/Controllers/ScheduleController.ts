import {Body, JsonController, Post} from 'routing-controllers';
import 'reflect-metadata'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {AsyncAdapter, NodeProvider} from '@stenodb/node'
import {DayEntity} from "../Entities/DayEntity";

interface ILesson {
    start: string;
    end: string;
}

@JsonController('/schedule')
export class ScheduleController {

    @Post('/save')
    saveToFile(@Body() data: ILesson[]) {
        const path = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'db')
        const initialData = new DayEntity(new ('John Doe'))
        const adapter = new AsyncAdapter('users', Users, initialData)
        const provider = new NodeProvider({path})
        const db = await provider.create(adapter)

        await db.read()
        db.data?.users[0]?.addPost(new Post('Lorem ipsum'))
        await db.write()
        return {message: 'Data saved to file.'};
    }

}