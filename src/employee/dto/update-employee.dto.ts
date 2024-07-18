import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpDto } from './create-employee.dto';

export class UpdateEmpDto extends PartialType(CreateEmpDto) {}
