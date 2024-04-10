import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'task' })
export class TaskEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number
    @Column({ name: 'user_id', nullable: false })
    userId: number;
    @Column({ name: 'title_task', nullable: false })
    titleTask: string;
    @Column({ name: 'description', nullable: false })
    description: string;
    @Column({ name: 'concluded' })
    concluded: boolean;
    @Column({ name: 'date_conclusion' })
    date_conclusion: Date;
    @Column({ name: 'priority', nullable: false })
    priority: number;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}