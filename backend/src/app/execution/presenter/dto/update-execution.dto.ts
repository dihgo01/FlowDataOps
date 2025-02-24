import { IsJSON, IsOptional, IsString } from "class-validator";

export class UpdateExecutionDto {
    @IsString()
    @IsOptional()
    status?: string;

    @IsString()
    @IsOptional()
    dateExecution?: Date | string;

    @IsOptional()
    outputResponse?: string;
}
