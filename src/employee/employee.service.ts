import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateEmpDto } from './dto/create-employee.dto';
import { UpdateEmpDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  //api methods opeartuions
  //database inti

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //perform crud operations

  //   create employee
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const isExistEm = await this.userModel.findById(id);
    if (!isExistEm) {
      throw new BadRequestException('Employee doesnot exists');
    }
    return isExistEm;
  }
  async create(employee: CreateEmpDto) {
    const isExistEmail = await this.userModel.findOne({
      email: employee.email,
    });

    if (isExistEmail) {
      throw new BadRequestException('emaoil address already exists ');
    }
    const newEmp = new this.userModel(employee);
    return await newEmp.save();
  }

  async delete(id: string) {
    try {
      const isExistEM = await this.userModel.findById(id);
      if (!isExistEM) {
        throw new BadRequestException("User doesn't exist");
      }
      const deleteEMp = await this.userModel.findByIdAndDelete(id);
      return {
        status: true,
        message: 'Data deleted',
        data: deleteEMp,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  async update(id: string, empData: UpdateEmpDto) {
    const isExistEm = await this.userModel.findById(id);
    if (!isExistEm) {
      throw new BadRequestException('Employee doesnot exists');
    }
    isExistEm.name = empData.name || isExistEm.name;
    isExistEm.email = empData.email || isExistEm.email;
    isExistEm.age = empData.age || isExistEm.age;

    const updatedEmp = await isExistEm.save();
    return {
      status: true,
      message: 'Data updated successfully',
      data: updatedEmp,
    };
  }
}
