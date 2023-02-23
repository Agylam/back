import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';

@JsonController()
export class AuthController {
  @Get('/users')
  getAll() {
    return {"a":"a","b":"b"};
  }

  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    return {"a":"a","b":id};
  }
}