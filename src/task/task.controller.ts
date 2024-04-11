import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/createTask.dto';
import { Controller, Post, ValidationPipe, UsePipes, Param, Body, Get } from '@nestjs/common';
import { TaskEntity } from './entity/task.entity';
import { UserType } from 'src/user/enum/user-type.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { ReturnTaskDto } from './dtos/returnTask.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly TaskService: TaskService) { }
    @Roles(UserType.User)
    @Post()
    @UsePipes(ValidationPipe)
    async create(
        @Body() createTaskDto: CreateTaskDto,
        @UserId() userId:number,
    ): Promise<TaskEntity> {
        return this.TaskService.createTask(createTaskDto, userId)
    }
    @Get()
    async getTaskByUserId(
        @UserId() userId:number
    ): Promise<ReturnTaskDto[]>{
        return (await (this.TaskService.getTasksByUserId(userId))).map((task)=> new ReturnTaskDto(task))
    }
}
