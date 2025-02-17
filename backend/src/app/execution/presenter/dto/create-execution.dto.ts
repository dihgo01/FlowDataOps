import { IsNotEmpty, IsString } from "class-validator";

export class CreateExecutionDto {
    @IsString()
    @IsNotEmpty()
    flow_id!: string;
}
