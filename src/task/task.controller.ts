import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/createTask.dto';
import { Controller, Post, ValidationPipe, UsePipes, Param, Body } from '@nestjs/common';
import { TaskEntity } from './entity/task.entity';

@Controller('task')
export class TaskController {
    constructor(private readonly TaskService: TaskService){}
    @Post('/:userId')
    @UsePipes(ValidationPipe)
    async create(
        @Body() createTaskDto: CreateTaskDto,
        @Param('userID') userId:number,
    ): Promise<TaskEntity> {
        return this.TaskService.createTask(createTaskDto, userId)
    }
}
