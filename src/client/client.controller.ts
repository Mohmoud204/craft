import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateUserDto } from "./dto/create-user.dto"
import { Login } from ".././worker/interface/login.interface"
import { Login_dto } from '.././worker/dto/login-worker.dto';
import { WorkerGuard } from ".././worker/guard/guard.guard"
import { ApiTags, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
@ApiTags('User')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }
   @ApiSecurity("Jwt-auth")
   @UseGuards(WorkerGuard)
  @Get()
  async findAll(): Promise<CreateUserDto[]> {
    return await this.clientService.findAll()
  }
  @Post("/crate")
  SignUser(@Body() createUserDto: CreateUserDto):Promise<CreateUserDto>  {
    return this.clientService.SignUser(createUserDto);
  }
  
  @Post("/login")
  loginUser(@Body() createUserDto:Login_dto): Promise<Login> {
    return this.clientService.loginUser(createUserDto);
  }


  @ApiSecurity("Jwt-auth")
  @UseGuards(WorkerGuard)
  @Post("/Refresh_token")
  Refresh_token(@Req() request): Promise<{ access_token: string }> {
    const { email, _id } = request['worker']
    return this.clientService.Refresh_token(email, _id);
  }
}
