import { UserService } from 'src/user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entity/user.entity';
import { LoginDto } from './dtos/login.dto';
import { compare } from 'bcrypt';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService, private jwtService:JwtService){}
    async login(loginDto:LoginDto):Promise<ReturnLogin> {
        const user: UserEntity | undefined = await this.userService.getUserByEmail(loginDto.email).catch(() => undefined)
        const isValid = await compare(loginDto.password, user?.password || '')
        if (!user || !isValid) throw new NotFoundException('Email ou senha Invalido!')
        return {
            accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
            user: new ReturnUserDto(user)
        }
    }
}
