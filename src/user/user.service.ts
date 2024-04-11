import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entity/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }
    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const saltOrRounds = 10
        const hashCrypt = await hash(createUserDto.password, saltOrRounds);
        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password: hashCrypt
        })
    }
    async getUserByIdUsingRelations(userId: number): Promise<UserEntity>{
        return this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: ['tasks']
        })
    }
    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find()
    }
    async getUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        })
        if (!user) throw new NotFoundException(`ID: ${userId} não encontrado!`)
        return user
    }
    async getUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        })
        if (!user) throw new NotFoundException(`Email: ${email} não encontrado!`)
        return user
    }
}
