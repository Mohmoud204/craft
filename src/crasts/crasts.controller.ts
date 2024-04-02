import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CrastsService } from './crasts.service';
import { CreateCrastDto } from './dto/create-crast.dto';
import { UpdateCrastDto } from './dto/update-crast.dto';
import {  ApiTags } from '@nestjs/swagger';

@ApiTags('crafts')
@Controller('crafts')
export class CrastsController {
  constructor(private readonly crastsService: CrastsService) { }
  @Get()
  async findAll(): Promise<CreateCrastDto[]> {
    return await this.crastsService.findAllUser()
  }
  @Get("craft/:id")
  async findById(@Param("id") id:string): Promise<CreateCrastDto> {
    return await this.crastsService.findById(id)
  }
  
  @Post()
 async addCraft(@Body() craft: CreateCrastDto): Promise<CreateCrastDto> {
    return await this.crastsService.addCraft(craft)
  }
}
