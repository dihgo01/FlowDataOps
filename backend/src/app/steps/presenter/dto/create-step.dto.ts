import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateStepDto {
    @IsString()
    @IsNotEmpty()
    stepName!: string;

    @IsString()
    @IsNotEmpty()
    icon!: string;

    @IsString()
    @IsNotEmpty()
    type!: string;

    @IsString()
    @IsOptional()
    config?: string;

    @IsString()
    @IsOptional()
    description?: string;
}
