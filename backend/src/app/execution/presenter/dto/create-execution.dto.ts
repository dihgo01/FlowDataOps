import { IsNotEmpty, IsString } from "class-validator";

export class CreateExecutionDto {
    @IsString()
    @IsNotEmpty()
    flowId!: string;
}
