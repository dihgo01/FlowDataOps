import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateStepDto {
    @IsString()
    @IsNotEmpty()
    stepName!: string;

    @IsString()
    @IsOptional()
    description?: string;
}
