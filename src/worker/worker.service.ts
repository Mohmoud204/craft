import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { Worker } from "./entities/worker.entity"
import { Login_dto } from './dto/login-worker.dto';
import { Login } from "./interface/login.interface"
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class WorkerServicee {
  constructor(@InjectModel(Worker.name) private WorkerModel: Model<Worker>,
    private jwtService: JwtService
  ) { }
  async findAll(): Promise<CreateWorkerDto[]> {
    return await this.WorkerModel.find().populate("craft_id").exec()
  }
  async findOneId(_id): Promise<CreateWorkerDto> {
    return await this.WorkerModel.findById(_id).populate("craft_name").exec()
  }
  async findWorker(craft_id): Promise<CreateWorkerDto[]> {
    if (craft_id == "الكل") return await this.WorkerModel.find().populate("craft_id").exec()
    return await this.WorkerModel.find({ craft_id }).populate("craft_id").exec()
  }
  async SignWorker(createWorkerDto: CreateWorkerDto): Promise<CreateWorkerDto | any> {
    const { password, username, email, phone, address, description, profile_img, work_imgs, active, role, craft_id } = createWorkerDto
    const found = await this.WorkerModel.findOne({ email })
    if (found) throw new BadRequestException("Email already exists...");
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const create = {
      username, email, phone, address, description, profile_img, work_imgs, active, role, craft_id,
      password: hash,

    }
    const newStudent = await new this.WorkerModel(create);
    return newStudent.save();
  }
  async loginWorker(createWorkerDto: Login_dto): Promise<Login> {
    const { email, password } = createWorkerDto
    const found = await this.WorkerModel.findOne({ email })
    if (!found) throw new NotFoundException("Email already not exists...");
    const verify_password = await bcrypt.compare(password, found.password);
    if (!verify_password) throw new BadRequestException("Wrong email or wrong password");
    const payload = { _id: found._id, email: found.email, role: found.role };
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
    const found = await this.WorkerModel.findOne({ email }).exec()
    if (!found) throw new NotFoundException("This email does not exist before")

    const payload = { _id: found._id, email: found.email };
    const access_token = await this.jwtService.signAsync(payload)
    return { access_token }
  }
  async photo(_id): Promise<CreateWorkerDto> {
    const user = await this.WorkerModel.findById(_id).populate("craft_id").exec()
    const imgs = user?.work_imgs
    const img = imgs.map(item => {
      if (item.img_id == "1") {
        item.img_id = "1238654£46787543£334455"
        item.work_img = "mohmoudhdghdgmhcgnhncggchchgnhghncgcggcmhhmcghcmghcg"
      }
    })
    return user.save()
  }
}

