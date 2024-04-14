import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/createTask.dto';
import { Controller, Post, ValidationPipe, UsePipes, Param, Body, Get, Delete, Put } from '@nestjs/common';
import { TaskEntity } from './entity/task.entity';
import { UserType } from 'src/user/enum/user-type.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { ReturnTaskDto } from './dtos/returnTask.dto';
import { DeleteResult } from 'typeorm';
import { UpdateTaskDto } from './dtos/updateTask.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly TaskService: TaskService) { }
    @Roles(UserType.User)
    @Post()
    @UsePipes(ValidationPipe)
    async create(
        @Body() createTaskDto: CreateTaskDto,
        @UserId() userId: number,
    ): Promise<TaskEntity> {
        return this.TaskService.createTask(createTaskDto, userId)
    }
    @Roles(UserType.User)
    @Get()
    async getTaskByUserId(
        @UserId() userId: number
    ): Promise<ReturnTaskDto[]> {
        return (await (this.TaskService.getTasksByUserId(userId))).map((task) => new ReturnTaskDto(task))
    }
    @Get('/:taskId')
    async getTask(@Param('taskId') taskId:number): Promise<ReturnTaskDto> {
        return this.TaskService.findTaskId(taskId)
    }
    @Roles(UserType.User)
    @UsePipes(ValidationPipe)
    @Put('/:taskId')
    async updateTask(
        @Body() upTask:UpdateTaskDto,
        @Param('taskId') taskId: number
    ): Promise<TaskEntity> {
        return this.TaskService.updateTask(upTask, taskId)
    }
    @Roles(UserType.User)
    @Delete('/:taskId')
    async deleteTask(
        @Param('taskId') taskId: number
    ): Promise<DeleteResult> {
        return this.TaskService.deleteTask(taskId)
    }
}
