import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCrastDto } from './dto/create-crast.dto';
import { UpdateCrastDto } from './dto/update-crast.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Crafts } from "./entities/crast.entity"
@Injectable()
export class CrastsService {
  constructor(@InjectModel(Crafts.name) private CraftsModel: Model<Crafts>) { }
  async findAllUser(): Promise<CreateCrastDto[]> {
    return this.CraftsModel.find().exec();
  }
  async addCraft({ craft }): Promise<CreateCrastDto> {
    const found = await this.CraftsModel.findOne({ craft })
    if (found) throw new BadRequestException("The craft already exists...")
    const newCraft = new this.CraftsModel({ craft });
    return newCraft.save()
  }

  async findById(craftId): Promise<CreateCrastDto> {
    const found = await this.CraftsModel.findById(craftId)
    if (!found) throw new BadRequestException("The craft not found")
    return found
  }
}
