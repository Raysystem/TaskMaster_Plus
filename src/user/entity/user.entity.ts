import { TaskEntity } from "src/task/entity/task.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'user'})
export class UserEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number
    @Column({name: 'name', nullable: false})
    name: string;
    @Column({ name: 'email', nullable: false })
    email: string;
    @Column({ name: 'type_user', nullable: false })
    typeUser: number;
    @Column({ name: 'password', nullable: false })
    password: string;
    @CreateDateColumn({name:'created_at'})
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    @OneToMany(()=>TaskEntity, (task)=> task.user)
    tasks: TaskEntity[]
}