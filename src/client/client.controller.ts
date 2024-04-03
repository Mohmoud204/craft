import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { Login } from ".././worker/interface/login.interface"
import { Login_dto } from '.././worker/dto/login-worker.dto';
import { WorkerGuard } from ".././worker/guard/guard.guard"
import { Role } from "../worker/guard/role.enum"
import { Roles } from "../worker/guard/guard.decorator"
import { ApiTags, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
@ApiTags('User')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }
  @ApiSecurity("Jwt-auth")
  @Roles(Role.Admin)
  @UseGuards(WorkerGuard)
  @Get()
  async findAll(): Promise<CreateUserDto[]> {
    return await this.clientService.findAll()
  }
  @Get('findOne/:id')
  findOne(@Param('id') _id: string): Promise<CreateUserDto> {
    return this.clientService.findOneId(_id);
  }
  @Post("/crate")
  SignUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.clientService.SignUser(createUserDto);
  }

  @Post("/login")
  loginUser(@Body() createUserDto: Login_dto): Promise<Login> {
    return this.clientService.loginUser(createUserDto);
  }


  @ApiSecurity("Jwt-auth")
  @UseGuards(WorkerGuard)
  @Post("/Refresh_token")
  Refresh_token(@Req() request): Promise<{ access_token: string }> {
    const { email, _id } = request['worker']
    return this.clientService.Refresh_token(email, _id);
  }

  @Delete("del/:_id")
  async Delete_client(@Param("_id") _id): Promise<String> {
    return await this.clientService.Delete_client(_id);
  }

  @Patch('updata/:_id')
  async updateUser(@Param('_id') _id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateUserDto> {
    return this.clientService.updateUser(_id, updateUserDto);
  }
}
