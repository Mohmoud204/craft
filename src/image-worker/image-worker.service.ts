import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { imgWorker } from "./dtos/Image.dto"
import { Images } from "./entities/Image.entity"
import { v2 } from 'cloudinary';
import { CloudinaryResponse } from '../worker/cloudinary-response';
import { Express } from "express"
const streamifier = require('streamifier');
@Injectable()
export class ImageWorkerService {
  constructor(@InjectModel(Images.name) private ImageModel: Model<Images>
  ) { }
  async uploadFile(file: Express.Multer.File, _id): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream({ folder: "profile_img" },
        async (error, result) => {
          if (error) return reject(error);
          
          resolve(result);
          const create = {
            work_img: result.secure_url,
            img_id: result.public_id
          }
          const newStudent = await new this.ImageModel(create);
          await newStudent.save();
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });

  }
}
