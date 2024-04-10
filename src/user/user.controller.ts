import { CreateUserDto } from './dtos/createUser.dto';
import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser)
    }
    @Get()
    async getAllUser(): Promise<UserEntity[]> {
        return this.userService.getAllUsers()
    }
}
