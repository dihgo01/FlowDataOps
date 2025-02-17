import { PartialType } from '@nestjs/mapped-types';
import { CreateStepDto } from './create-execution.dto';

export class UpdateExecutionDto extends PartialType(CreateStepDto) {}
