import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CreateTaskDto } from './dtos/createTask.dto';
import { ReturnTaskDto } from './dtos/returnTask.dto';
import { UpdateTaskDto } from './dtos/updateTask.dto';

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
    ): Promise<TaskEntity> {
        await this.userService.getUserById(userId)
        return this.taskRepository.save({
            ...createTaskDto,
            user_Id: userId
        })
    }
    async getTasksByUserId(userId: number): Promise<TaskEntity[]> {
        const tasks = await this.taskRepository.find({
            where: {
                userId
            }
        })
        if(!tasks || tasks.length === 0) throw new NotFoundException('Tarefas vazia para este usuário!')
        return tasks
    }
    async findTaskId(taskId:number): Promise<TaskEntity>{
        const task = await this.taskRepository.findOne({
            where: {
                id: taskId
            }
        })
        if (!task) throw new NotFoundException('Tarefa não Encontrada!')
        return task
    }
    async updateTask(upTask: UpdateTaskDto, taskId:number): Promise<TaskEntity>{
        const task = await this.findTaskId(taskId)
        return this.taskRepository.save({
            ...task,
            ...upTask
        })
    }
    async deleteTask(taskId: number): Promise<DeleteResult>{
        await this.findTaskId(taskId)
        return this.taskRepository.delete({ id: taskId })
    }
}