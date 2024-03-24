import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { Worker } from "./entities/worker.entity"
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class WorkerServicee {
  constructor(@InjectModel(Worker.name) private WorkerModel: Model<Worker>) { }
  async findAll(): Promise<CreateWorkerDto[]> {
    return await this.WorkerModel.find().populate("craft_id").exec()
  }
  async findOneId(_id): Promise<CreateWorkerDto> {
    return await this.WorkerModel.findById(_id).populate("craft_name").exec()
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

  async findWorker(craft_id): Promise<CreateWorkerDto[]> {
    return await this.WorkerModel.find({ craft_id }).populate("craft_id").exec()
  }
}
