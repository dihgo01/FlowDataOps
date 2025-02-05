import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FlowService } from '../application/service/flow.service';
import { CreateFlowDto } from './dto/create-step.dto';
import { UpdateFlowDto } from './dto/update-step.dto';

@Controller('flow')
export class FlowController {
  constructor(private readonly flowService: FlowService) {}

  @Post()
  async create(@Body() createFlowDto: CreateFlowDto) {
    return this.flowService.create(createFlowDto);
  }

  @Get()
  async findAll() {
    return this.flowService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.flowService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFlowDto: UpdateFlowDto) {
    return this.flowService.update(+id, updateFlowDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.flowService.remove(+id);
  }
}
