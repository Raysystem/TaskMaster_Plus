import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CreateTaskDto } from './dtos/createTask.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        private readonly userService: UserService
    ) { }
    async createTask(
        createTaskDto: CreateTaskDto,
        userId: number
    ): Promise<TaskEntity>{
        await this.userService.getUserById(userId)
        return this.taskRepository.save({
            ...createTaskDto,
            user_Id: userId
        })
    }
}
