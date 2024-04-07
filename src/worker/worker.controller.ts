import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req, UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { WorkerServicee } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { Login_dto } from './dto/login-worker.dto';
import { Login } from "./interface/login.interface"
import { WorkerGuard } from "./guard/guard.guard"
import { Express } from "express"
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { Worker } from "./entities/worker.entity"
@ApiTags('worker')
@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerServicee) { }

  @ApiBearerAuth()
  @ApiSecurity("Jwt-auth")
  @UseGuards(WorkerGuard)
  @Get()
  findAll(): Promise<Worker[]> {
    return this.workerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') _id: string): Promise<Worker> {
    return this.workerService.findOneId(_id);
  }
  @Get("gets/worker/:craft")
  async findWorker(@Param("craft") craft_id: string): Promise<Worker[]> {
    return this.workerService.findWorker(craft_id);
  }

  @Post("/crate")
  SignWorker(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workerService.SignWorker(createWorkerDto);
  }
  @Post("/login")
  loginUser(@Body() createWorkerDto: CreateWorkerDto): Promise<Login> {
    return this.workerService.loginWorker(createWorkerDto);
  }
  @ApiSecurity("Jwt-auth")
  @UseGuards(WorkerGuard)
  @Post("/Refresh_token")
  Refresh_token(@Req() request): Promise<{ access_token: string }> {
    const { email, _id } = request['worker']
    return this.workerService.Refresh_token(email, _id);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File, @Param('id') _id: string) {
    return this.workerService.uploadFile(file,_id);
  }
  @Post('upload/Worker/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadWorker(@UploadedFile() file: Express.Multer.File, @Param('id') _id: string) {
    return this.workerService.uploadWorkerFile(file,_id);
  }
}
