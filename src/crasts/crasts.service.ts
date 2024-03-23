import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Craft_Return } from "./Returns/crafts.retutn"
import { Crafts } from "./Database/Crafts.db"
@Injectable()
export class CrastsService {
  constructor(@InjectModel(Crafts.name) private CraftsModel: Model<Crafts>) { }

  async findAllUser(): Promise<Craft_Return[]> {
    return this.CraftsModel.find().exec();
  }
  async addCraft({ craft }): Promise<Craft_Return> {
    const found = await this.CraftsModel.findOne({ craft })
    if (found) throw new BadRequestException("The craft already exists...")
    const newCraft = new this.CraftsModel({ craft });
    return newCraft.save()
  }

  async findById(craftId): Promise<Craft_Return> {
    console.log(craftId)
    const found = await this.CraftsModel.findById(craftId)
    if (!found) throw new BadRequestException("The craft not found")
    return found
  }

}
