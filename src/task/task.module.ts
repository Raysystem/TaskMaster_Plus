import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { UserModule } from 'src/user/user.module';
import { TaskEntity } from './entity/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]),UserModule],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
