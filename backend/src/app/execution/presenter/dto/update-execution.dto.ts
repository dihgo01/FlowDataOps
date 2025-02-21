import { IsDate, IsOptional, IsString } from "class-validator";


export class UpdateExecutionDto {
    @IsString()
    @IsOptional()
    status?: string;

    @IsDate()
    @IsOptional()
    dateExecution?: Date;
}
