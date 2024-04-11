import { TaskEntity } from "../entity/task.entity";

export class ReturnTaskDto {
    id: number
    userId: number;
    titleTask: string;
    description: string;
    concluded: boolean;
    date_conclusion: Date;
    priority: number;

    constructor(taskEntity: TaskEntity) {
        this.id = taskEntity.id;
        this.userId = taskEntity.userId;
        this.titleTask = taskEntity.titleTask;
        this.description= taskEntity.description;
        this.concluded = taskEntity.concluded;
        this.date_conclusion = taskEntity.date_conclusion;
        this.priority = taskEntity.priority;
    }
}