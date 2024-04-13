import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entity/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePasswordDto } from './dtos/updatepassword.dto';
import { createPassHash, validatePassword } from 'src/utis/pass';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }
    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = await this.getUserByEmail(createUserDto.email).catch(() => undefined)
        if(user) throw new BadGatewayException('Email já cadastrado!')
        const saltOrRounds = 10
        const hashCrypt = await hash(createUserDto.password, saltOrRounds);
        const resp = this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password: hashCrypt
        })
        delete (await resp).password
        delete (await resp).createdAt
        delete (await resp).updatedAt
        return resp
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
    async updatePasswordUser(upPassUser:UpdatePasswordDto,userId:number): Promise<UserEntity> {
        const user = await this.getUserById(userId)
        const passHash = await createPassHash(upPassUser.newPassword)
        const isMath = await validatePassword(upPassUser.lastPassword, user.password || '')
        if(!isMath) throw new BadRequestException('Ultima senha invalida!')
        return this.userRepository.save({
            ...user,
            password: passHash
        })
    }
}
