import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateFlowDto {

    @IsString()
    @IsNotEmpty()
    flowName!: string;

    @IsString()
    @IsOptional()
    description?: string;
}
