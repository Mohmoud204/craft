import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from "./entities/user.entities"
import { CreateUserDto } from "./dto/create-user.dto"
import { Login_dto } from '.././worker/dto/login-worker.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Login } from ".././worker/interface/login.interface"
@Injectable()
export class ClientService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService) { }
  async findAll(): Promise<CreateUserDto[]> {
    return await this.UserModel.find().exec()
  }
  async SignUser(createUserDto): Promise<CreateUserDto> {
    const { username, email, password } = createUserDto
    const found_user = await this.UserModel.findOne({ email }).exec()
    if (found_user) throw new BadRequestException("Email already exists...");
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const create = {
      username, email,
      password: hash,
    }
    const newStudent = await new this.UserModel(create);
    return newStudent.save();
  }

  async loginUser(createUserDto: Login_dto): Promise<Login> {
    const { email, password } = createUserDto
    const found = await this.UserModel.findOne({ email })
    if (!found) throw new NotFoundException("Email already not exists...");
    const verify_password = await bcrypt.compare(password, found.password);
    if (!verify_password) throw new BadRequestException("Wrong email or wrong password");
    const payload = { _id: found._id, email: found.email };
    const access_token = await this.jwtService.signAsync(payload)
    const refresh_token = await this.jwtService.sign(payload, { expiresIn: '30d' })

    const login = found
    return {
      access_token,
      refresh_token,
      login
    }
  }
  async Refresh_token(email, _id): Promise<{ access_token: string }> {
    const found = await this.UserModel.findOne({ email }).exec()
    if (!found) throw new NotFoundException("This email does not exist before")

    const payload = { _id: found._id, email: found.email };
    const access_token = await this.jwtService.signAsync(payload)
    return { access_token }
  }
}
