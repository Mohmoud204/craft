import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkerServicee } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerServicee) { }

  @Post()
  SignWorker(@Body() createWorkerDto) {
    return this.workerService.SignWorker(createWorkerDto);
  }

  @Get()
  findAll(): Promise<CreateWorkerDto[]> {
    return this.workerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') _id: string): Promise<CreateWorkerDto> {
    return this.workerService.findOneId(_id);
  }
  @Get("gets/worker/:craft")
  async findWorker(@Param("craft") craft_id: string): Promise<CreateWorkerDto[]> {
    return this.workerService.findWorker(craft_id);
  }
}
