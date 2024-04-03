import { Controller, Get, Post, Body, UseGuards ,Req} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { WorkerServicee } from ".././worker/worker.service"
import { CrastsService } from ".././crasts/crasts.service"
import { Login } from ".././worker/interface/login.interface"
import { Login_dto } from '.././worker/dto/login-worker.dto';
import { ClientService } from ".././client/client.service"
import { CreatedashbordDto } from "./dto/create_dashboard"
import { ApiTags, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { WorkerGuard } from ".././worker/guard/guard.guard"
import { Role } from "../worker/guard/role.enum"
import { Roles } from "../worker/guard/guard.decorator"
@ApiTags('dashboard')

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly clientService: ClientService,
    private readonly crastsService: CrastsService,
    private readonly workerService: WorkerServicee
  ) { }
  @Roles(Role.Admin)
@UseGuards(WorkerGuard)
  @Get()
  async dashboard(): Promise<any> {
    const findClientAll = await this.clientService.findAll()
    const findCrastsAll = await this.crastsService.findAllUser()
    const findWorkerAll = await this.workerService.findAll();

    return {
      findCrastsAll,
      findWorkerAll,
      findClientAll
    }
  }
  @Roles(Role.Admin)
@UseGuards(WorkerGuard)
  @Get("getAdmin")
  async GetAdmin(): Promise<CreatedashbordDto[]> {
    return await this.dashboardService.GetAdmin();
  }
  @Post("/crate")
  async SignAdmin(@Body() createdashbordDto: CreatedashbordDto): Promise<CreatedashbordDto> {
    return await this.dashboardService.SignAdmin(createdashbordDto);
  }

  @Post("/login")
  loginAdmin(@Body() createadminDto: Login_dto): Promise<Login> {
    return this.dashboardService.loginAdmin(createadminDto);
  }


  @ApiSecurity("Jwt-auth")
  @UseGuards(WorkerGuard)
  @Post("/Refresh_token")
  Refresh_token(@Req() request): Promise<{ access_token: string }> {
    const { email, _id } = request['worker']
    return this.dashboardService.Refresh_token(email, _id);
  }
}
