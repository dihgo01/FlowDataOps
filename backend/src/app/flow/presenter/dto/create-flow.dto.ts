import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumberString, IsOptional, IsString, ValidateNested } from "class-validator";

class CreateWorkflowStepDto {
    @IsNumberString()
    @IsNotEmpty()
    step_id: string;

    @IsOptional()
    configuration?: any;

    @IsNotEmpty()
    order!: number;
}

export class CreateFlowDto {

    @IsString()
    @IsNotEmpty()
    flowName!: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateWorkflowStepDto)
    steps?: CreateWorkflowStepDto[];
}
