import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmpDto } from './dto/create-employee.dto';
import { UpdateEmpDto } from './dto/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  /*
  GET /users  => get all users
  GET /users/:id => get individual users
  POST /users  => add users
  PATCH /users/:id  => update users
  DELETE /users/:id  => delete users
  */

  constructor(private readonly employeeService: EmployeeService) {}

  //   find all
  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  //create employee

  @Post() // post /users
  create(@Body(ValidationPipe) employeee: CreateEmpDto) {
    return this.employeeService.create(employeee);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe)
    empData: UpdateEmpDto,
  ) {
    return this.employeeService.update(id, empData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.employeeService.delete(id);
  }
}
