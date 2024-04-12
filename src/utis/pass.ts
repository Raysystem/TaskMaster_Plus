import { compare, hash } from "bcrypt";

export const createPassHash = async (password: string):Promise<string>=>{
    const saltOrRounds = 10
    return hash(password, saltOrRounds);
}
export const validatePassword = async (password:string, passHash:string): Promise<boolean> => {
    return compare(password, passHash)
}