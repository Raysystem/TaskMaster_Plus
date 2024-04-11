import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/createTask.dto';
import { Controller, Post, ValidationPipe, UsePipes, Param, Body } from '@nestjs/common';
import { TaskEntity } from './entity/task.entity';
import { UserType } from 'src/user/enum/user-type.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('task')
export class TaskController {
    constructor(private readonly TaskService: TaskService) { }
    @Roles(UserType.Admin)
    @Post('/:userId')
    @UsePipes(ValidationPipe)
    async create(
        @Body() createTaskDto: CreateTaskDto,
        @Param('userID') userId:number,
    ): Promise<TaskEntity> {
        return this.TaskService.createTask(createTaskDto, userId)
    }
}
