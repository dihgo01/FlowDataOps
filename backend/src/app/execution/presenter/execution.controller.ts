import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ExecutionService } from '../application/service/execution.service';
import { CreateExecutionDto } from './dto/create-execution.dto';
import { UpdateExecutionDto } from './dto/update-execution.dto';

@Controller('executions')
export class ExecutionController {
  constructor(private readonly executionService: ExecutionService) { }

  @Post()
  async create(@Body() createStepDto: CreateExecutionDto) {
    return this.executionService.create(createStepDto);
  }

  @Get()
  async findAll(
    @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.executionService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.executionService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStepDto: UpdateExecutionDto) {
    return this.executionService.update(id, updateStepDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.executionService.remove(id);
  }
}
