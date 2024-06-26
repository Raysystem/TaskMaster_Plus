import { UserEntity } from "../entity/user.entity";

export class ReturnUserDto {
    id: number;
    name: string;
    email: string;
    typeUser: number;

    constructor(userEntity: UserEntity) {
        this.id = userEntity.id;
        this.name = userEntity.name;
        this.email = userEntity.email;
        this.typeUser = userEntity.typeUser;
    }
}