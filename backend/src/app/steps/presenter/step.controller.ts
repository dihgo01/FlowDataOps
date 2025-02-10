import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StepService } from '../application/service/step.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';

@Controller('steps')
export class StepController {
  constructor(private readonly stepService: StepService) { }

  @Post()
  async create(@Body() createStepDto: CreateStepDto) {
    return this.stepService.create(createStepDto);
  }

  @Get()
  async findAll(
    @Param('page') page: number, @Param('limit') limit: number, @Param('stepName') stepName?: string) {
    return this.stepService.findAll(page, limit, stepName);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.stepService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStepDto: UpdateStepDto) {
    return this.stepService.update(+id, updateStepDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.stepService.remove(+id);
  }
}
