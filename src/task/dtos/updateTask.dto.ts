import { IsBoolean, IsDate, IsDateString, IsInt, IsString } from "class-validator";

export class UpdateTaskDto {
    @IsInt()
    userId: number;
    @IsString()
    titleTask: string;
    @IsString()
    description: string;
    @IsBoolean()
    concluded: boolean;
    @IsInt()
    status: number;
    date_conclusion: Date;
    @IsInt()
    priority: number;
}