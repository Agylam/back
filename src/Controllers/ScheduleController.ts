import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';

@JsonController()
export class ScheduleController {
    @Get('/user')
    getAll() {
        return {"a":"a","b":"b"};
    }

    @Get('/user/:id')
    getOne(@Param('id') id: number) {
        return {"a":"a","b":id};
    }
}