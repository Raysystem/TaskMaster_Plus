import { CreateUserDto } from './dtos/createUser.dto';
import { Body, Controller, Get, Param, Post, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { UpdatePasswordDto } from './dtos/updatepassword.dto';
import { UserId } from 'src/decorators/user-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';
import { ReturnUserDto } from './dtos/returnUser.dto';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser)
    }
    @Roles(UserType.Admin)
    @Get()
    async getAllUser(): Promise<UserEntity[]> {
        return this.userService.getAllUsers()
    }
    @Roles(UserType.Admin)
    @Get('/:userId')
    async getUserById(@Param('userId') userId: number) {
        return this.userService.getUserByIdUsingRelations(userId)
    }
    @Roles(UserType.Admin, UserType.User)
    @Patch('/:userId')
    @UsePipes(ValidationPipe)
    async updatePasswordUser(@UserId() userId: number, @Body() upPassDto: UpdatePasswordDto): Promise<UserEntity>{
        return this.userService.updatePasswordUser(upPassDto, userId)
    }
}


