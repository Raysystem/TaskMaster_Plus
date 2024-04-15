import { IsBoolean, IsDate, IsDateString, IsInt, IsString } from "class-validator";

export class CreateTaskDto {
    // @IsInt()
    userId: number;
    // @IsString()
    titleTask: string;
    // @IsString()
    description: string;
    // @IsBoolean()
    concluded: boolean;
    status: number;
    date_conclusion: Date;
    // @IsInt()
    priority: number;
}