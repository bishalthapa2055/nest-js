import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cats, CatsSchema } from 'src/schemas/cats.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cats.name,
        schema: CatsSchema,
      },
    ]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
