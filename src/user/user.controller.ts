import { CreateUserDto } from './dtos/createUser.dto';
import { Body, Controller,Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Post()
    async createUser(@Body() createUser:CreateUserDto) {
        return { ...createUser, password: undefined }
    }
}
