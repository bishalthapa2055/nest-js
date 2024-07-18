import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  /*
  GET /users  => get all users
  GET /users/:id => get individual users
  POST /users  => add users
  PATCH /users/:id  => update users
  DELETE /users/:id  => delete users
  */
  constructor(private readonly userService: UsersService) {}

  @Get() //  /users
  findAll(@Query('role') role?: 'intern' | 'developer' | 'admin') {
    return this.userService.findAll(role);
  }

  @Get(':id') //get individuyal users /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post() // post /users
  create(@Body(ValidationPipe) user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Patch(':id') //update /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    userUpdate: UpdateUserDto,
  ) {
    return this.userService.update(id, userUpdate);
  }

  @Delete(':id') //delete /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
