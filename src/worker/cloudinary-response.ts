// cloudinary-response.ts
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { imgWorker } from "../image-worker/dtos/Image.dto"
interface Img {
  avatar: string
  img_id: string
}
export type CloudinaryResponse = Img | UploadApiResponse | imgWorker | UploadApiErrorResponse;
