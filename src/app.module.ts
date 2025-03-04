import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/employee.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [UsersModule, DatabaseModule, EmployeeModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
