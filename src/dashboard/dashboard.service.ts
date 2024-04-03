import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dashboard } from "./entities/dashboard.entities"
import { CreatedashbordDto } from "./dto/create_dashboard"
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Login } from ".././worker/interface/login.interface"
import { Login_dto } from '.././worker/dto/login-worker.dto';
@Injectable()
export class DashboardService {
  constructor(@InjectModel(Dashboard.name) private DashboardModel: Model<Dashboard>,
    private jwtService: JwtService) { }
  async GetAdmin(): Promise<CreatedashbordDto[]> {
    return this.DashboardModel.find().exec()
  }

  async SignAdmin(createdashbordDto: CreatedashbordDto): Promise<CreatedashbordDto> {
    const { username, email, password } = createdashbordDto
    const found_user = await this.DashboardModel.findOne({ email }).exec()
    if (found_user) throw new BadRequestException("Email already exists...");
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const create = {
      username, email,
      password: hash,
    }
    const newStudent = await new this.DashboardModel(create);
    return newStudent.save();
  }


  /**
 * @loginUser
 * */
  async loginAdmin(createadminDto: Login_dto): Promise<Login> {
    const { email, password } = createadminDto
    const found = await this.DashboardModel.findOne({ email })
    if (!found) throw new NotFoundException("Email already not exists...");
    const verify_password = await bcrypt.compare(password, found.password);
    if (!verify_password) throw new BadRequestException("Wrong email or wrong password");
    const payload = { _id: found._id, email: found.email, role: found.role }

    const access_token = await this.jwtService.signAsync(payload)
    const refresh_token = await this.jwtService.sign(payload, { expiresIn: '30d' })

    const login = found
    return {
      access_token,
      refresh_token,
      login
    }
  }
  /**
   * @Refresh_token
   * */
  async Refresh_token(email, _id): Promise<{ access_token: string }> {
    const found = await this.DashboardModel.findOne({ email }).exec()
    if (!found) throw new NotFoundException("This email does not exist before")

    const payload = { _id: found._id, email: found.email };
    const access_token = await this.jwtService.signAsync(payload)
    return { access_token }
  }

}
